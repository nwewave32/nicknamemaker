import React, { useState, useEffect, useRef } from "react";
import { globalUtil } from "lib/util";
import { HeaderBtn, BorderBox } from "component/GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CopyWindow, CustomText, CustomImg, FlexBox } from "component";
import { StartMenu } from "component/main/StartMenu";
import { useRecoilState } from "recoil";
import { isShowMenuState } from "lib/data/atom";

const ControlBarContainer = styled(FlexBox).attrs({
  align: "flex-start",
})`
  min-height: 30px;
  width: 100%;
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: ${colorStyle.white};
  padding: 2px;
  position: absolute;
  bottom: 0;
  z-index: 5;
  box-sizing: border-box;
`;

const StartBtn = styled(BorderBox)`
  margin-right: 5px;
  min-height: 24px;
  min-width: 100px;
  max-width: 185px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px;
  white-space: nowrap;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

export const ControlBar = ({ toggleWindowVisibility, windows, openWindow }) => {
  const [isShowMenu, setIsShowMenu] = useRecoilState(isShowMenuState);
  return (
    <ControlBarContainer>
      <StartBtn
        style={{ minWidht: 0 }}
        onClick={() => {
          setIsShowMenu((prev) => !prev);
        }}
      >
        <CustomImg
          imgSrc="images/icons/window_logo.png"
          width={24}
          marginRight={3}
        />
        <CustomText>Start</CustomText>
      </StartBtn>

      {windows.map((window) => (
        <StartBtn
          key={window.id}
          onClick={() => {
            toggleWindowVisibility(window.id);
          }}
        >
          {!globalUtil.checkIsNull(window.icon) && (
            <CustomImg imgSrc={window.icon} width={24} marginRight={3} />
          )}
          <CustomText ellipsizeMode="tail">{window.title}</CustomText>
        </StartBtn>
      ))}

      {isShowMenu ? (
        <StartMenu isShowMenu={isShowMenu} openWindow={openWindow} />
      ) : (
        <></>
      )}
    </ControlBarContainer>
  );
};
