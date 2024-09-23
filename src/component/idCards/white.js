import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, WindowBox, CustomImg } from "component";
import { colorStyle } from "lib/data/styleData";
import { globalUtil } from "lib/util";

const WhiteFont = styled.div.attrs((props) => ({
  fontSize: `${props.fontSize}px`,
}))`
  font-family: "YoonChildfundkoreaManSeh";
  font-size: ${(props) => props.fontSize};
  word-break: keep-all;
`;

const Background = styled.div`
  width: 368px;
  height: 208px;
  background-color: ${colorStyle.white};
  position: relative;
  overflow: hidden;
`;

const BackgroundCloud = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: -8%;
  top: -10%;
  background-image: url("images/white/cloud.png");
  background-size: 120%;
  background-size: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled(FlexBox)`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const WhiteCard = ({ info }) => {
  const [birthDay, setBirthDay] = useState(info.birthday);
  useLayoutEffect(() => {
    console.log("##info", info);

    setBirthDay((prev) => {
      if (typeof prev === "string") {
        const bdArr = prev.split("-");

        return {
          year: bdArr[0],
          month: bdArr[1],
          day: bdArr[2],
        };
      } else return prev;
    });
  }, []);

  useEffect(() => {
    console.log("##birthDay", birthDay);
  }, [birthDay]);
  return (
    <Background>
      <BackgroundCloud></BackgroundCloud>
      <ContentContainer
        direction="column"
        align="flex-start"
        justify="space-around"
      >
        <WhiteFont fontSize={20} style={{ marginBottom: "15px" }}>
          안녕하세요, {info.name} 입니다.
        </WhiteFont>

        <WhiteFont fontSize={18}>
          저는 {birthDay.year}년 {birthDay.month}월 {birthDay.day}일에
          태어났어요.
        </WhiteFont>
        <WhiteFont fontSize={18}>지금 {info.location}에 살고 있고요.</WhiteFont>
        {!globalUtil.checkIsNull(info.bloodType) && (
          <WhiteFont fontSize={18}>
            혈액형은 {info.bloodType}형이에요.
          </WhiteFont>
        )}
        {!globalUtil.checkIsNull(info.zodiac) && (
          <WhiteFont fontSize={18}>별자리는 {info.zodiac}예요.</WhiteFont>
        )}
        {!globalUtil.checkIsNull(info.pride) && (
          <WhiteFont fontSize={15} style={{ wordBreak: "break-all" }}>
            TMI: {info.pride}!
          </WhiteFont>
        )}
        <WhiteFont fontSize={18}>끝이에요.</WhiteFont>
      </ContentContainer>
    </Background>
  );
};
