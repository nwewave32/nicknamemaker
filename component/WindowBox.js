import React from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { HeaderBtn } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const BorderBox = styled(FlexBox)`
  background: ${colorStyle.backgroundColor};
  border-style: solid;
  border-width: 2px;
  border-color: ${colorStyle.white} ${colorStyle.darkGray}
    ${colorStyle.darkGray} ${colorStyle.white};
  padding: 1px;
`;

const HeaderContainer = styled(BorderBox)`
  width: 100%;
  border-width: 1px;
  background-color: ${colorStyle.headerColor};
  padding: 0;
  box-sizing: border-box;
`;

const ModalContainer = styled(FlexBox)`
  width: 80%;
  border-width: 0 1px 1px 0;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};
  background-color: ${colorStyle.backgroundColor};
  shadow-color: ${colorStyle.darkGray};
  box-shadow: 0 1px ${colorStyle.darkGray};
  padding: 0;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

const TitleContainer = styled(FlexBox)`
  padding-left: 10px;
`;

const MsgContainer = styled(FlexBox)`
  padding: 10px;
  min-height: 100px;
`;

export const WindowBox = ({
  windowVisible,
  setWindowVisible,
  msg,
  title,
  setWindowDelete,
  ...rest
}) => {
  return (
    <ModalContainer direction="column" style={{ ...rest.style }}>
      <HeaderContainer justify="space-between">
        <FlexBox>
          {typeof title === "string" ? (
            <TitleContainer>
              <CustomText color={colorStyle.white}>{title}</CustomText>
            </TitleContainer>
          ) : (
            <>{title}</>
          )}
        </FlexBox>
        <FlexBox>
          {windowVisible !== "none" && (
            <HeaderBtn justify="center" onClick={() => setWindowVisible(false)}>
              <HiMinusSmall size={20} color="black" />
            </HeaderBtn>
          )}

          <HeaderBtn justify="center" onClick={() => setWindowDelete(true)}>
            <GrFormClose name="close" size={20} color="black" />
          </HeaderBtn>
        </FlexBox>
      </HeaderContainer>

      {typeof msg === "string" ? (
        <MsgContainer direction="column">
          <CustomText>{msg}</CustomText>
        </MsgContainer>
      ) : (
        <>{msg}</>
      )}
    </ModalContainer>
  );
};
