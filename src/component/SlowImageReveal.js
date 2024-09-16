import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { FlexBox } from "./FlexBox";
import { globalUtil, makeNameUtil } from "lib/util";
import { CustomText } from "./CustomText";
import styled from "styled-components";
import { ProcessBar } from "./ProcessBar";
import { colorStyle } from "lib/data/styleData";

import { FullContainer } from "./GlobalStyles";
import { CheckBox } from "./CheckBox";

const RevealBox = styled(FlexBox)`
  height: 100%;
  width: 100%;
  background-color: ${colorStyle.white};
`;

const CoverBox = styled(FlexBox)
  .attrs((props) => ({
    style: {
      top: props.revealHeight,
    },
  }))
  .withConfig({
    shouldForwardProp: (prop) => !["revealHeight"].includes(prop),
  })`
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  transition: top 0.1s linear;
  background-color: ${colorStyle.backgroundColor};
`;

const RevealBoxContainer = styled(FlexBox)`
  margin-top: 20px;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
`;

export const SlowImageReveal = ({ newName, refresh, setRefresh }) => {
  const [revealHeight, setRevealHeight] = useState(0); // 이미지가 보이는 높이 (0% ~ 100%)
  const [isRevealing, setIsRevealing] = useState(false); // 이미지 노출 중 상태

  useLayoutEffect(() => {
    startReveal();
  }, []);

  const startReveal = () => {
    setIsRevealing(true);
    setRevealHeight(0);

    const totalDuration = 0.5 * 60 * 1000; // 3분 동안 이미지 천천히 노출
    const intervalDuration = 100; // 진행률 업데이트 간격 (0.1초)
    const revealIncrement = 100 / (totalDuration / intervalDuration); // 노출 높이 증가 값

    const revealInterval = setInterval(() => {
      setRevealHeight((prevHeight) => {
        if (prevHeight >= 100) {
          clearInterval(revealInterval);
          setIsRevealing(false);
          return 100;
        }
        return prevHeight + revealIncrement;
      });
    }, intervalDuration);
  };

  useEffect(() => {
    setRefresh(!isRevealing);
  }, [isRevealing]);

  useEffect(() => {
    if (!refresh) startReveal();
  }, [refresh]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!isRevealing && (
        <CustomText fontSize={14} fontWeight="bold">
          새로운 이름이 발행되었습니다!
        </CustomText>
      )}
      <RevealBoxContainer>
        <RevealBox justify="center">
          <CustomText fontSize={18}>{newName}</CustomText>
        </RevealBox>
        <CoverBox revealHeight={`${revealHeight}%`} />
      </RevealBoxContainer>
      <div style={{ marginTop: "20px" }}>
        {isRevealing && (
          <>
            <ProcessBar process={revealHeight} />
          </>
        )}
      </div>
    </div>
  );
};
