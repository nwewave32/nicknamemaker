import React, { useState } from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { HeaderBtn, BorderBox } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const HeaderContainer = styled(BorderBox)`
  width: 100%;
  border-width: 1px;
  background-color: ${colorStyle.headerColor};
  padding: 0;
  box-sizing: border-box;
`;

const ModalContainer = styled(FlexBox)`
  min-width: 300px;
  max-width: 60%;
  border-width: 0 1px 1px 0;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};
  background-color: ${colorStyle.backgroundColor};
  shadow-color: ${colorStyle.darkGray};
  box-shadow: 0 1px ${colorStyle.darkGray};

  padding: 0;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  z-index: 10;
`;

const TitleContainer = styled(FlexBox)`
  padding-left: 10px;
`;

const MsgContainer = styled(FlexBox).attrs({
  justify: "center",
  direction: "column",
})`
  padding: 10px;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
`;

const IconImg = styled.img`
  margin-right: 3px;
  margin-left: 10px;
`;

//window container => for style
export const CopyWindow = ({
  id,
  setWindowVisible,
  setWindowDelete,
  msg,
  title,
  icon,
  isModal,
  ...rest
}) => {
  return (
    <ModalContainer direction="column" style={{ ...rest.style }}>
      <HeaderContainer justify="space-between">
        <FlexBox>
          {icon === null || icon === undefined || icon === "" ? (
            <TitleContainer>
              <CustomText color={colorStyle.white}>{title}</CustomText>
            </TitleContainer>
          ) : (
            <FlexBox style={{ minHeight: 24 }}>
              <IconImg src={icon} width={20} />
              <CustomText color={colorStyle.white}>{title}</CustomText>
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox>
          {!isModal && (
            <HeaderBtn justify="center" onClick={() => setWindowVisible(id)}>
              <HiMinusSmall size={20} color="black" />
            </HeaderBtn>
          )}

          <HeaderBtn justify="center" onClick={() => setWindowDelete(id)}>
            <GrFormClose name="close" size={20} color="black" />
          </HeaderBtn>
        </FlexBox>
      </HeaderContainer>

      {typeof msg === "string" ? (
        <MsgContainer>
          <CustomText>{msg}</CustomText>
        </MsgContainer>
      ) : (
        <MsgContainer>{msg}</MsgContainer>
      )}
    </ModalContainer>
  );
};
