import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
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
  cursor: pointer;
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
  children,
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
              {children
                ? children.map((item, idx) => (
                    <Fragment key={item + " " + idx}>
                      <ItemContainer
                        onClick={(e) => {
                          callback(e, idx);
                        }}
                      >
                        <CustomText>{item.title}</CustomText>
                      </ItemContainer>

                      <BorderLine />
                    </Fragment>
                  ))
                : items?.map((item, idx) => {
                    return (
                      <Fragment key={item.title + " " + idx}>
                        {item.type === "file" ? (
                          <>
                            <label
                              htmlFor="photo"
                              style={{
                                width: "100%",
                                background: "pink",
                                cursor: "pointer",
                              }}
                            >
                              <ItemContainer
                                onClick={() => {
                                  console.log("##??????????");
                                }}
                              >
                                <CustomText>{item.title}</CustomText>
                              </ItemContainer>
                            </label>
                            <input
                              name="photo"
                              id="photo"
                              type="file"
                              style={{ visibility: "hidden", height: 0 }}
                              accept="image/*"
                              onChange={item.onChange}
                            />
                          </>
                        ) : (
                          <>
                            <ItemContainer
                              onClick={(e) => {
                                callback(e, idx);
                              }}
                            >
                              <CustomText>{item.title}</CustomText>
                            </ItemContainer>

                            <BorderLine />
                          </>
                        )}
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
