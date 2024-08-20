import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const ModalBackground = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const BottomSheet = ({ btsVisible, setBtsVisible, body, header }) => {
  return (
    <Modal
      // animationType="slide"
      // transparent={true}
      isOpen={btsVisible}
      onRequestClose={() => {
        alert("BottomSheet has been closed.");
        setBtsVisible((prev) => !prev);
      }}
    >
      <ModalBackground
        align="flex-end"
        onClick={() => {
          if (btsVisible) setBtsVisible((prev) => !prev);
        }}
      >
        <FlexBox
          style={{
            width: "100%",
            backgroundColor: colorStyle.backgroundColor,
            padding: 10,
            borderTopWidth: 2,
            borderTopColor: colorStyle.white,
            borderLeftWidth: 2,
            borderLeftColor: colorStyle.white,
            borderBottomWidth: 2,
            borderBottomColor: colorStyle.darkGray,
            borderRightWidth: 2,
            borderRightColor: colorStyle.darkGray,
          }}
          direction="column"
        >
          <FlexBox style={{ width: "100%", marginBottom: 10 }}>
            <CustomText>{header}</CustomText>
          </FlexBox>
          <FlexBox style={{ width: "100%" }}>{body}</FlexBox>
        </FlexBox>
      </ModalBackground>
    </Modal>
  );
};
