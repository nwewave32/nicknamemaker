import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, WindowBox, CustomImg, FullContainer } from "component";
import { colorStyle } from "lib/data/styleData";
import { globalUtil } from "lib/util";
import moment from "moment";

const GreenFont = styled.div.attrs((props) => ({
  fontSize: `${props.fontSize}px`,
}))`
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
  font-size: ${(props) => props.fontSize};
  color: ${colorStyle.black};
  word-break: keep-all;
`;

const Background = styled.div`
  width: 368px;
  height: 208px;

  background-color: #39913d;
  position: relative;
  overflow: hidden;
`;

const BackgroundLeaf = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(340deg);
  background-color: #124715;

  width: 500px;
  height: 208px;
`;

const BackgroundLeaf2 = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(340deg);
  background-color: ${colorStyle.white};

  width: 500px;
  height: 100px;
`;

const RightPart = styled(FlexBox)`
  width: 100%;
`;

const LeftPart = styled(FlexBox)`
  width: 100%;
`;

const ContentContainer = styled(FlexBox)`
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  padding: 0 40px;
`;

export const GreenCard = ({ info }) => {
  const [birthDay, setBirthDay] = useState(info.birthday);
  useLayoutEffect(() => {
    setBirthDay((prev) => {
      return moment(prev).format("YYYY.MM.DD");
    });
  }, []);
  return (
    <Background>
      <BackgroundLeaf />
      <BackgroundLeaf2 />
      <ContentContainer direction="column" justify="center">
        <RightPart direction="column" align="right">
          {!globalUtil.checkIsNull(info.bloodType) && (
            <GreenFont fontSize={12}>{info.bloodType}형</GreenFont>
          )}

          <GreenFont fontSize={12}>{birthDay}</GreenFont>
        </RightPart>
        <GreenFont fontSize={15}>{info.name}</GreenFont>

        <LeftPart direction="column" align="start">
          {!globalUtil.checkIsNull(info.pride) && (
            <GreenFont fontSize={12}>TMI: {info.pride}!</GreenFont>
          )}
          <GreenFont fontSize={12}>{info.location}</GreenFont>

          {!globalUtil.checkIsNull(info.zodiac) && (
            <GreenFont fontSize={12}>{info.zodiac}</GreenFont>
          )}
        </LeftPart>
      </ContentContainer>
    </Background>
  );
};
