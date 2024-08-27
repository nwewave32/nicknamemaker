import React from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";
import styled from "styled-components";
import { HeaderBtn, BorderBox } from "./GlobalStyles";

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

const ModalHeader = styled(BorderBox).attrs({
  justify: "space-between",
})`
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border-width: 1px;
`;

const MsgContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "center",
})`
  min-height: 100px;
  padding: 10px;
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

export const CustomModal = ({ modalVisible, setModalVisible, msg, title }) => {
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
          <ModalHeader>
            {typeof title === "string" ? (
              <CustomText color={colorStyle.white}>{title}</CustomText>
            ) : (
              <>{title}</>
            )}

            <HeaderBtn
              onClick={() => {
                console.log("##??");
                setModalVisible(!modalVisible);
              }}
            >
              <GrFormClose name="close" size={20} color="black" />
            </HeaderBtn>
          </ModalHeader>

          <MsgContainer>
            {typeof msg === "string" ? (
              <CustomText>{msg}</CustomText>
            ) : (
              <FlexBox>{msg}</FlexBox>
            )}
          </MsgContainer>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};
