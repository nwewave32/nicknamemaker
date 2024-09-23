import React, { useLayoutEffect, useState, useEffect } from "react";

import {
  CustomButton,
  FullContainer,
  SlowImageReveal,
  CustomModal,
  CustomToast,
} from "component";
import { globalUtil, makeNameUtil } from "lib/util";
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

  function shareUrl() {
    navigator.clipboard
      .writeText(nowUrl)
      .then((res) => {
        //alret modal
        if (modalVisible) setModalVisible(false);
        setToastMsg("URL이 복사되었습니다");
        setToastVisible(true);
      })
      .catch(() => {
        //alret modal
        if (modalVisible) setModalVisible(false);
        setToastMsg("URL 복사를 실패했습니다");
        setToastVisible(true);
      });
  }
  function shareKakao() {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("e79b288ebffab6c35ea1c3d7624e2f3a");
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "딸기 치즈 케익",
          description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
          imageUrl:
            "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    }
  }

  function shareNaver() {
    var url = encodeURI(encodeURIComponent(nowUrl));
    var title = encodeURI("nicknamemaker");
    var shareURL =
      "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
    // document.location = shareURL;
    window.open(shareURL);
  }

  function shareTwitter() {
    var sendText = "nicknamemaker"; // 전달할 텍스트
    var sendUrl = nowUrl; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    );
  }
  function shareFacebook() {
    var sendUrl = nowUrl; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
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

  useEffect(() => {
    console.log("##newName", newName);
  }, [newName]);

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
              pressCallback={() => shareUrl()}
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
                console.log("##idasdf", id);
                closeWindow(id);
                openWindow({
                  id: Date.now(),
                  type: "IdCard",
                  visible: true,
                  title: "New Id Card!",
                  icon: "images/icons/card.png",
                  msg: <IdCard info={infoProps} />,
                  zIndex: 10,
                  isActive: true,
                });
              }}
            />
          </FullWithMargin>
        )}
      </FullContainer>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msg={
          <>
            <FullContainer>
              <CustomButton
                text="Facebook"
                margin={{ right: "5px" }}
                pressCallback={() => shareFacebook()}
              />

              <CustomButton
                margin={{ right: "5px" }}
                text="Kakao Talk"
                pressCallback={() => shareKakao()}
              />
            </FullContainer>
            <FullWithMargin>
              <CustomButton
                text="Twitter"
                margin={{ right: "5px" }}
                pressCallback={() => shareTwitter()}
              />
              <CustomButton
                margin={{ right: "5px" }}
                text="Naver"
                pressCallback={() => shareNaver()}
              />
              <CustomButton
                margin={{ right: "5px" }}
                text="Link"
                pressCallback={() => shareUrl()}
              />
            </FullWithMargin>
          </>
        }
        icon="images/icons/tree_16.png"
        title="Share"
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
