import React, { useEffect, useState } from "react";

import { FlexBox, CustomText, WindowBox, CustomImg } from "component";

export const IdCard = ({ info }) => {
  return (
    <>
      <CustomText>{info.name}</CustomText>
      <CustomText>{info.location}</CustomText>
      <CustomText>{info.birthday}</CustomText>
      <CustomImg imgSrc={info.photo} width={200} />
      {/* 스타일 수정 */}
      {/* 바코드 / 큐알 */}
      {/* 저장, 공유 기능 */}
    </>
  );
};
