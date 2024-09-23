import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, WindowBox, CustomImg, FullContainer } from "component";
import { colorStyle } from "lib/data/styleData";
import { globalUtil } from "lib/util";
import moment from "moment";

const PurpleFont = styled.div.attrs((props) => ({
  fontSize: `${props.fontSize}px`,
}))`
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  text-shadow: 1px 1px 2px pink;
  font-size: ${(props) => props.fontSize};
  color: ${colorStyle.white};
  word-break: keep-all;
`;

const Background = styled.div`
  width: 368px;
  height: 208px;

  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled(FlexBox)`
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  padding: 0 40px;
`;

export const PurpleCard = ({ info }) => {
  const [birthDay, setBirthDay] = useState(info.birthday);
  useLayoutEffect(() => {
    setBirthDay((prev) => {
      return moment(prev).format("YYYY.MM.DD");
    });
  }, []);
  return (
    <Background>
      <ContentContainer direction="column" justify="center">
        <span>
          I'm <PurpleFont fontSize={15}>{info.name}</PurpleFont>. Blood Type is
          typical{" "}
          {!globalUtil.checkIsNull(info.bloodType) && (
            <PurpleFont fontSize={12}>{info.bloodType}형</PurpleFont>
          )}
          .<PurpleFont fontSize={12}>{birthDay}</PurpleFont>
          {!globalUtil.checkIsNull(info.pride) && (
            <PurpleFont fontSize={12}>TMI: {info.pride}!</PurpleFont>
          )}
          <PurpleFont fontSize={12}>{info.location}</PurpleFont>
          {!globalUtil.checkIsNull(info.zodiac) && (
            <PurpleFont fontSize={12}>{info.zodiac}</PurpleFont>
          )}
        </span>
      </ContentContainer>
    </Background>
  );
};
