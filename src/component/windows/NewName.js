import React, { useLayoutEffect, useState, useEffect } from "react";

import {
  CustomButton,
  FullContainer,
  SlowImageReveal,
  CustomModal,
  CustomToast,
  ShareModal,
} from "component";
import { globalUtil, makeNameUtil, shareUtil } from "lib/util";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { closeWindowSelector, openWindowSelector } from "lib/data/atom";
import { IdCard } from "./IdCard";

const FullWithMargin = styled(FullContainer)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const NewName = ({ id, info }) => {
  const [newName, setNewName] = useState("");
  const [isShowBtns, setIsShowBtns] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);

  const openWindow = useSetRecoilState(openWindowSelector);
  const closeWindow = useSetRecoilState(closeWindowSelector);
  const nowUrl = window.location.href;

  function copyName() {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = newName;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);

    if (modalVisible) setModalVisible(false);
    setToastMsg("이름이 클립보드에 복사되었습니다");
    setToastVisible(true);
  }
  const getNewName = () => {
    const hasMiddleName = info.bloodType === "A" || info.bloodType === "AB";
    setNewName(() => {
      const result = makeNameUtil.makeNameFuncMain(
        hasMiddleName,
        info.vibe.name
      );

      return `${result.first} ${result.middle || ""} ${result.last}`;
    });
  };
  useLayoutEffect(() => {
    if (!isShowBtns) {
      setTimeout(() => getNewName(), 500);
    }
  }, [isShowBtns]);

  return (
    <>
      <FullContainer direction="column">
        <SlowImageReveal
          newName={newName}
          refresh={isShowBtns}
          setRefresh={setIsShowBtns}
        />

        {isShowBtns && (
          <FullWithMargin>
            <CustomButton
              margin={{ right: "5px" }}
              text="Share"
              pressCallback={() => setModalVisible(true)}
            />

            <CustomButton
              margin={{ right: "5px" }}
              text="Copy"
              pressCallback={() => copyName()}
            />
            <CustomButton
              margin={{ right: "5px" }}
              text="Retry"
              pressCallback={() => {
                setIsShowBtns(false);
              }}
            />
            <CustomButton
              text="Id Card"
              highlight={true}
              pressCallback={() => {
                const infoProps = {
                  name: newName,
                  location: info.location,
                  birthday: info.birthday,
                  photo: info.photo,
                  bloodType: info.bloodType,
                  zodiac: info.zodiac,
                  pride: info.pride,
                  vibe: info.vibe.name,
                };

                closeWindow(id);
                const nowDt = Date.now();
                openWindow({
                  id: nowDt,
                  type: "IdCard",
                  visible: true,
                  title: "New Id Card!",
                  icon: "images/icons/card.png",
                  msg: <IdCard info={infoProps} id={nowDt} />,
                  zIndex: 10,
                  isActive: true,
                });
              }}
            />
          </FullWithMargin>
        )}
      </FullContainer>
      <ShareModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nowUrl={nowUrl}
        setToastMsg={setToastMsg}
        setToastVisible={setToastVisible}
      />

      {toastVisible && (
        <CustomToast
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          msg={toastMsg}
        />
      )}
    </>
  );
};
