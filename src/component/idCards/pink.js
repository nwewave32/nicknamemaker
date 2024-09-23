import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, WindowBox, CustomImg, FullContainer } from "component";
import { colorStyle } from "lib/data/styleData";
import { globalUtil } from "lib/util";
import moment from "moment";

const PinkFont = styled.div.attrs((props) => ({
  fontSize: `${props.fontSize}px`,
}))`
  font-family: "Gowun Batang", serif;
  font-weight: 400;
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

export const PinkCard = ({ info }) => {
  const [birthDay, setBirthDay] = useState(info.birthday);
  useLayoutEffect(() => {
    setBirthDay((prev) => {
      return moment(prev).format("YYYY.MM.DD");
    });
  }, []);
  return (
    <Background>
      <ContentContainer direction="column" justify="center">
        <RightPart direction="column" align="right">
          {!globalUtil.checkIsNull(info.bloodType) && (
            <PinkFont fontSize={12}>{info.bloodType}형</PinkFont>
          )}

          <PinkFont fontSize={12}>{birthDay}</PinkFont>
        </RightPart>
        <PinkFont fontSize={15}>{info.name}</PinkFont>

        <LeftPart direction="column" align="start">
          {!globalUtil.checkIsNull(info.pride) && (
            <PinkFont fontSize={12}>TMI: {info.pride}!</PinkFont>
          )}
          <PinkFont fontSize={12}>{info.location}</PinkFont>

          {!globalUtil.checkIsNull(info.zodiac) && (
            <PinkFont fontSize={12}>{info.zodiac}</PinkFont>
          )}
        </LeftPart>
      </ContentContainer>
    </Background>
  );
};
