import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexBox, Window, CustomImg, CustomText } from "component";
import { ControlBar } from "component/main/ControlBar";
import {
  openWindowSelector,
  windowsState,
  isShowMenuState,
} from "lib/data/atom";
import { colorStyle, randomImgList } from "lib/data/styleData";

import { Intro } from "component/windows";
import { Folders } from "component/main/Folders";
import { globalUtil, makeNameUtil, storageUtil } from "lib/util";
import { TYPE } from "lib/data/constant";

const BackgroundContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background: ${colorStyle.windowBackColor};
`;

export default function MainScreen({}) {
  const [windows, setWindows] = useRecoilState(windowsState);
  const [name, setName] = useState("");
  useEffect(() => {
    const info = {
      birthday: "1997-03-24",
      bloodType: "AB",
      zodiac: "taurus",
      vibe: {
        name: "white",
      },
    };
    const name = makeNameUtil.makeNameFuncMain(info, true);
    console.log("##name", name);
    setName(() => {
      return `${name.first} ${name.middle || ""} ${name.last}`;
    });
  }, [windows]);
  const openWindow = useSetRecoilState(openWindowSelector);

  useLayoutEffect(() => {
    // storageUtil.clearAll();

    openWindow({
      id: Date.now(), // Unique ID for each window
      type: TYPE.INTRO,
      visible: true,
      title: "반가워요!",
      icon: "images/icons/hand.png",
      msg: <Intro />,
      zIndex: 10,
      isActive: true,
    });
  }, []);

  const toggleWindowVisibility = (id) => {
    console.log("##id", id);
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
          else {
            return { ...w, isActive: true, visible: !w.visible };
          }
        })
      );
  };

  return (
    <>
      <BackgroundContainer>
        <Folders />
        <CustomText fontSize={20}>
          {name} {name.length}
        </CustomText>
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
