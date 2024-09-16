import React, { useState, useLayoutEffect, useCallback } from "react";
import { FlexBox } from "./FlexBox";
import { globalUtil, makeNameUtil } from "lib/util";
import { CustomText } from "./CustomText";
import styled from "styled-components";

const BarColor = styled(FlexBox)`
  width: ${(props) => `${props.process}%`};
  height: 100%;
  background-color: green;
`;

const BarContainer = styled(FlexBox)`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  margin: auto;
`;

export const ProcessBar = ({ process }) => {
  return (
    <>
      <p>발행 중: {Math.round(process)}%</p>
      <BarContainer>
        <BarColor process={process} />
      </BarContainer>
    </>
  );
};
