import React, { useState } from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { HeaderBtn, BorderBox } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText, CustomImg } from "component";
import { FlexBox } from "./FlexBox";
import { globalUtil } from "lib/util";

const StyledHeaderBtn = styled(HeaderBtn)`
  width: 20px;
  height: 20px;
`;

const HeaderContainer = styled(BorderBox).withConfig({
  shouldForwardProp: (prop) => !["isActive"].includes(prop),
})`
  width: 100%;
  border-width: 1px;
  background-color: ${(props) =>
    props.isActive ? colorStyle.headerColor : colorStyle.darkGray};
  padding: 0;
  box-sizing: border-box;
`;

const ModalContainer = styled(FlexBox)`
  min-width: 300px;

  width: min-content;
  shadow-color: ${colorStyle.darkGray};
  box-shadow: 0 1px ${colorStyle.darkGray};

  shadow-opacity: 0.25;
  shadow-radius: 4px;
  z-index: 10;
`;

const Container = styled(FlexBox)`
  width: 100%;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};
  background-color: ${colorStyle.backgroundColor};
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
  isActive,
  ...rest
}) => {
  return (
    <ModalContainer direction="column" style={{ ...rest.style }}>
      <Container direction="column">
        <HeaderContainer justify="space-between" isActive={isActive}>
          <FlexBox>
            {globalUtil.checkIsNull(icon) ? (
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

            <StyledHeaderBtn
              justify="center"
              align="center"
              onClick={() => setWindowDelete(id)}
            >
              <CustomImg
                imgSrc="images/icons/close.png"
                width={14}
                style={{ cursor: "pointer" }}
              />
            </StyledHeaderBtn>
          </FlexBox>
        </HeaderContainer>

        {typeof msg === "string" ? (
          <MsgContainer>
            <CustomText>{msg}</CustomText>
          </MsgContainer>
        ) : (
          <MsgContainer>{msg}</MsgContainer>
        )}
      </Container>
    </ModalContainer>
  );
};
