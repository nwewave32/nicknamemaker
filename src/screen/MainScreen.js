import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexBox, Window, CustomImg } from "component";
import { ControlBar } from "component/main/ControlBar";
import {
  openWindowSelector,
  windowsState,
  isShowMenuState,
} from "lib/data/atom";
import { colorStyle, randomImgList } from "lib/data/styleData";

import { Intro } from "component/windows";
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
  const openWindow = useSetRecoilState(openWindowSelector);
  const [isShowMenu, setIsShowMenu] = useRecoilState(isShowMenuState);

  useLayoutEffect(() => {
    openWindow({
      id: Date.now(), // Unique ID for each window
      type: "intro",
      visible: true,
      title: "반가워요!",
      icon: "images/icons/hand.png",
      msg: <Intro />,
      zIndex: 10,
      isActive: true,
    });
  }, []);

  useLayoutEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dragBackground.current &&
        !dragBackground.current.contains(event.target)
      ) {
        setIsShowMenu(false); // startmenu 이외의 영역을 클릭했을 때 startmenu 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          if (w.id === id && w.visible)
            return { ...w, isActive: false, visible: !w.visible };
          else if (w.id !== id && w.visible) return { ...w, isActive: false };
          else return { ...w, isActive: true, visible: !w.visible };
        })
      );
  };

  useEffect(() => {
    console.log("##isShowMenu", isShowMenu);
  }, [isShowMenu]);

  return (
    <>
      <BackgroundContainer ref={dragBackground}>
        <Folders />

        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            toggleVisibility={toggleWindowVisibility}
          />
        ))}

        <ControlBar
          windows={windows}
          toggleWindowVisibility={toggleWindowVisibility}
        />
      </BackgroundContainer>
    </>
  );
}
