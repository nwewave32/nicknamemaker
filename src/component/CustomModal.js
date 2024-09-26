import React, { useState } from "react";
import Modal from "react-modal";

import { colorStyle } from "lib/data/styleData";
import { FlexBox } from "./FlexBox";
import { WindowBox, CustomButton } from "component";
import styled from "styled-components";
import { FullContainer, BorderBox } from "./GlobalStyles";
import { shareUtil } from "lib/util";

const CenteredView = styled(FlexBox).attrs({
  justify: "center",
  align: "center",
})`
  flex: 1;
  margin-top: 22px;
`;

const ModalView = styled(FlexBox)`
  max-width: 400px;
  border-style: solid;
  border-width: 1px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};

  background-color: ${colorStyle.backgroundColor};
  shadow-color: ${colorStyle.black};
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

const FullWithMargin = styled(FullContainer)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",

    zIndex: 9999,
  },
};

export const CustomModal = ({
  modalVisible,
  setModalVisible,
  msg,
  title,
  icon,
}) => {
  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => {
        alert("Modal has been closed.");
        setModalVisible((prev) => !prev);
      }}
      style={customStyles}
    >
      <CenteredView>
        <ModalView direction="column">
          <WindowBox
            title={title}
            msg={msg}
            icon={icon}
            isModal={true}
            isActive={true}
            setWindowDelete={setModalVisible}
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export const ShareModal = ({
  modalVisible,
  setModalVisible,
  nowUrl,
  setToastMsg,
  setToastVisible,
}) => {
  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      msg={
        <>
          <FullContainer>
            <CustomButton
              text="Facebook"
              margin={{ right: "5px" }}
              pressCallback={() => shareUtil.shareFacebook(nowUrl)}
            />

            <CustomButton
              margin={{ right: "5px" }}
              text="Kakao Talk"
              pressCallback={() => shareUtil.shareKakao(nowUrl)}
            />
          </FullContainer>
          <FullWithMargin>
            <CustomButton
              text="Twitter"
              margin={{ right: "5px" }}
              pressCallback={() => shareUtil.shareTwitter(nowUrl)}
            />
            <CustomButton
              margin={{ right: "5px" }}
              text="Naver"
              pressCallback={() => shareUtil.shareNaver(nowUrl)}
            />
            <CustomButton
              margin={{ right: "5px" }}
              text="Link"
              pressCallback={() => {
                shareUtil
                  .shareUrl(nowUrl)
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
              }}
            />
          </FullWithMargin>
        </>
      }
      icon="images/icons/tree_16.png"
      title="Share"
    />
  );
};
