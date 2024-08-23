import React, { Fragment } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";
import { BorderBox, BorderLine, FullContainer } from "./GlobalStyles";

const ModalBackground = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BottomSheetContainer = styled(BorderBox).attrs({ direction: "column" })`
  width: 100%;
  padding: 10px;
`;

const ItemContainer = styled(FlexBox)`
  min-height: 50px;
  padding-left: 5px;
  width: 100%;
`;

Modal.setAppElement("#root");

const customStyles = {
  content: {
    bottom: 0,
    padding: 0,
    inset: 0,
    backgroundColor: "transparent",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9999,
  },
};

export const BottomSheet = ({
  btsVisible,
  setBtsVisible,
  body,
  header,
  items,
  callback,
}) => {
  return (
    <Modal
      style={customStyles}
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
        <BottomSheetContainer>
          <FullContainer style={{ marginBottom: 10 }}>
            <CustomText fontWeight="bold" fontSize={12}>
              {header}
            </CustomText>
          </FullContainer>
          <FullContainer>
            <FullContainer direction="column">
              {items.map((item, idx) => {
                return (
                  <Fragment key={item + " " + idx}>
                    <ItemContainer
                      onClick={() => {
                        callback(idx);
                      }}
                    >
                      <CustomText>{item}</CustomText>
                    </ItemContainer>

                    <BorderLine />
                  </Fragment>
                );
              })}
            </FullContainer>
          </FullContainer>
        </BottomSheetContainer>
      </ModalBackground>
    </Modal>
  );
};
