import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, WindowBox, CustomImg, FullContainer } from "component";
import { colorStyle } from "lib/data/styleData";
import { globalUtil } from "lib/util";

const BlackFont = styled.div.attrs((props) => ({
  fontSize: `${props.fontSize}px`,
}))`
  font-family: "Gowun Batang", serif;
  font-weight: 400;
  font-style: normal;
  font-size: ${(props) => props.fontSize};
  color: ${colorStyle.white};
  word-break: keep-all;
`;

const Background = styled.div`
  width: 368px;
  height: 208px;
  background-color: ${colorStyle.black};
  position: relative;
`;

const RightPart = styled(FlexBox)`
  width: 50%;
`;

const LeftPart = styled(FlexBox)`
  width: 50%;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: ${colorStyle.white};
`;

const ContentContainer = styled(FlexBox)`
  box-sizing: border-box;
  height: 100%;
`;

export const BlackCard = ({ info }) => {
  return (
    <Background>
      <ContentContainer direction="column" justify="flex-end">
        <FullContainer justify="center" style={{ height: "90%" }}>
          <RightPart justify="center">
            <BlackFont fontSize={13}>{info.name}</BlackFont>
          </RightPart>

          <LeftPart direction="column">
            <BlackFont fontSize={12}>{info.birthDay}</BlackFont>
            <BlackFont fontSize={12}>{info.location}</BlackFont>
            {!globalUtil.checkIsNull(info.bloodType) && (
              <BlackFont fontSize={12}>{info.bloodType}형</BlackFont>
            )}
            {!globalUtil.checkIsNull(info.zodiac) && (
              <BlackFont fontSize={12}>{info.zodiac}</BlackFont>
            )}
          </LeftPart>
        </FullContainer>
        {!globalUtil.checkIsNull(info.pride) && (
          <BlackFont fontSize={12}>TMI: {info.pride}!</BlackFont>
        )}
      </ContentContainer>
    </Background>
  );
};
