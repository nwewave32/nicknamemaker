import React, { useLayoutEffect, useEffect, useRef } from "react";
import { globalUtil } from "lib/util";
import { HeaderBtn, BorderBox } from "component/GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { WindowBox, CustomText, CustomImg, FlexBox } from "component";
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
  z-index: 15;
  box-sizing: border-box;
`;

const borderColor = ({ active }) => {
  return !active
    ? ""
    : `border-color: ${colorStyle.black} ${colorStyle.white} ${colorStyle.white}
    ${colorStyle.black};`;
};
const StartBtn = styled(BorderBox).withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})`
  ${borderColor}

  margin-right: 5px;
  min-height: 30px;
  min-width: 100px;
  max-width: 185px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px;
  white-space: nowrap;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

export const ControlBar = ({ toggleWindowVisibility, windows }) => {
  const [isShowMenu, setIsShowMenu] = useRecoilState(isShowMenuState);
  const startMenu = useRef();

  useEffect(() => {
    if (isShowMenu) toggleWindowVisibility(0);
  }, [isShowMenu]);

  useLayoutEffect(() => {
    const handleClickOutside = (event) => {
      if (startMenu.current && !startMenu.current.contains(event.target)) {
        setIsShowMenu(false); // startmenu 이외의 영역을 클릭했을 때 startmenu 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ControlBarContainer>
      <StartBtn
        style={{ minWidht: 0 }}
        onClick={() => {
          setIsShowMenu((prev) => !prev);
        }}
        active={isShowMenu}
      >
        <CustomImg
          imgSrc="images/icons/window_logo.png"
          width={24}
          marginRight={3}
        />
        <CustomText>Start</CustomText>
      </StartBtn>

      {[...windows]
        .sort((a, b) => a.id - b.id)
        .map((window) => (
          <StartBtn
            key={window.id}
            onClick={() => {
              toggleWindowVisibility(window.id);
            }}
            active={window.isActive}
          >
            {globalUtil.checkIsNull(window.icon) ? (
              <CustomImg width={24} marginRight={3} />
            ) : (
              <CustomImg imgSrc={window.icon} width={24} marginRight={3} />
            )}
            <CustomText ellipsizeMode="tail" maxWidth="100px">
              {window.title}
            </CustomText>
          </StartBtn>
        ))}

      {isShowMenu ? <StartMenu ref={startMenu} /> : <></>}
    </ControlBarContainer>
  );
};
