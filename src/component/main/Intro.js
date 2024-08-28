import React, { useLayoutEffect, useState } from "react";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "component";

export const Intro = ({}) => {
  return (
    <>
      <CustomText>새 이름을 원할 경우</CustomText>
      <CustomText fontSize={11} fontWeight="bold">
        Start &gt; New &gt; Name
      </CustomText>

      <CustomText>새 신분증을 원할 경우</CustomText>
      <CustomText fontSize={11} fontWeight="bold">
        Start &gt; New &gt; ID Card
      </CustomText>
    </>
  );
};
