import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { CustomModal, CustomText, FlexBox, Window, CustomImg } from "component";
import { ControlBar } from "component/main/ControlBar";
import { needUpdateState, windowsState } from "lib/data/atom";
import { colorStyle, randomImgList } from "lib/data/styleData";

import { Intro } from "component/main/Intro";
import { Folders } from "component/main/Folders";

const BackgroundContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  height: 100vh;
  width: 100vw;

  position: relative;
  background: ${colorStyle.windowBackColor};
`;

export default function MainScreen({}) {
  const dragBackground = useRef(null);
  const [windows, setWindows] = useRecoilState(windowsState);

  useLayoutEffect(() => {
    setWindows(() => {
      const introWindow = {
        id: Date.now(), // Unique ID for each window
        type: "intro",
        visible: true,
        title: "반가워요!",
        icon: "images/icons/hand.png",
        msg: <Intro />,
        zIndex: 10,
        isActive: true,
      };
      return [introWindow];
    });
  }, []);

  useEffect(() => {
    console.log("##windows", windows);
  }, [windows]);

  const openWindow = (newWindow) => {
    setWindows((prev) => {
      const originWindows = prev.map((window) => ({
        ...window,
        isActive: false,
      }));

      return [...originWindows, newWindow];
    });
  };

  const toggleWindowVisibility = (id) => {
    if (id === 0)
      setWindows(
        windows.map((w) => {
          return { ...w, isActive: false };
        })
      );
    else
      setWindows(
        windows.map((w) => {
          if (w.id === id && w.visible) return { ...w, isActive: true };
          else if (w.id !== id && w.visible) return { ...w, isActive: false };
          else return { ...w, visible: !w.visible };
        })
      );
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  return (
    <>
      <BackgroundContainer
        onClick={() => {
          //todo: 백그라운드 클릭시 메뉴 닫히도록
          // if (isShowMenu)
          //   setIsShowMenu(false); //todo: need?
          //   if (inputFocused) {
          //Keyboard.dismiss();
          //   }
        }}
        ref={dragBackground}
      >
        <Folders />

        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            toggleVisibility={toggleWindowVisibility}
            closeWindow={closeWindow}
          />
        ))}

        <ControlBar
          windows={windows}
          toggleWindowVisibility={toggleWindowVisibility}
          openWindow={openWindow}
        />
      </BackgroundContainer>
    </>
  );
}
