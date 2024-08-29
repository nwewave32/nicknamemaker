import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { FlexBox, CustomText, CustomModal, CustomImg } from "component";
import { BorderBox, BorderLine } from "component/GlobalStyles";
import { AppInfo } from "component/main/AppInfo";
import { MdArrowRight } from "react-icons/md";
import { colorStyle, randomImgList } from "lib/data/styleData";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  needUpdateState,
  storageListState,
  isShowMenuState,
  windowsState,
} from "lib/data/atom";
import { GetInfo } from "./GetInfo";
import { GetInfoMore } from "./GetInfoMore";

const ParentsMenuContainer = styled(BorderBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  min-width: 250px;
  position: absolute;
  top: -254px;
  z-index: 55;
  padding: 0;
`;

const ChildMenuContainer = styled(BorderBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 15;
  min-width: 80%;
  padding: 0;
`;

const ParentsMenuItem = styled(FlexBox)
  .attrs({
    justify: "space-between",
  })
  .withConfig({
    shouldForwardProp: (prop) => !["backcolor"].includes(prop),
  })`
  background: ${(props) => props.backcolor};
  width: 100%;
  min-height: 50px;
  margin: 0;
  cursor: pointer;
`;

const ChildMenuItem = styled(FlexBox).attrs({
  justify: "flex-start",
})`
  background: ${colorStyle.backgroundColor};
  min-height: 40px;
  position: relative;
  z-index: 15;
  padding-right: 5px;
`;

export const StartMenu = ({ openWindow }) => {
  const [isShowMenu, setIsShowMenu] = useRecoilState(isShowMenuState);
  const [isShowChildMenu, setIsShowChildMenu] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const storageData = useRecoilValue(storageListState);
  const windows = useRecoilValue(windowsState);

  const menuArr = [
    {
      id: 0,
      name: "Programs",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Programs",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/programs.png",
    },
    {
      id: 1,
      name: "Find",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Find",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/find_file.png",
    },
    {
      id: 2,
      name: "New",
      child: [
        {
          id: 0,
          name: "Name",
          icon: "images/icons/file_pencil.png",
          nav: "NewName",
          parents: "New",
        },
        {
          id: 1,
          name: "ID Card",
          icon: "images/icons/bear.png",
          nav: "NewCard",
          parents: "New",
        },
      ],
      icon: "images/icons/new.png",
    },
    {
      id: 3,
      name: "App Info",
      child: null,
      nav: "AppInfoMain",
      icon: "images/icons/help.png",
    },
    {
      id: 4,
      name: "Settings",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Settings",
          icon: "images/icons/no_permission.png",
        },
      ],
      icon: "images/icons/settings.png",
    },
  ];

  useEffect(() => {
    if (!isShowMenu) setIsShowChildMenu(""); // 부모 사라지면 자식도 같이 사라짐
  }, [isShowMenu]);

  const hasWindow = (type) => {
    let hasWindow = false;
    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      if (window.type === type) {
        hasWindow = true;
        //todo: increasee zindex
      }
    }
    return hasWindow;
  };

  return (
    <>
      <ParentsMenuContainer>
        {menuArr.map((menuItem) => {
          return (
            <Fragment key={menuItem.id + menuItem.name}>
              {menuItem.name === "New" ? <BorderLine /> : <></>}
              <ParentsMenuItem
                onClick={() => {
                  if (menuItem.child) setIsShowChildMenu(menuItem.name);
                  else
                    openWindow({
                      id: Date.now(),
                      type: "appInfo",
                      visible: true,
                      title: "information",
                      icon: "",
                      msg: <AppInfo />,
                    }); //child 없는 메뉴는 app info 뿐이라 얘만 일단 넣겠다
                }}
                key={menuItem.id + menuItem.name}
                backcolor={
                  menuItem.name === isShowChildMenu
                    ? colorStyle.headerColor
                    : colorStyle.backgroundColor
                }
              >
                <FlexBox>
                  <CustomImg
                    imgSrc={menuItem.icon}
                    width={24}
                    marginLeft={5}
                    marginRight={5}
                  />
                  <CustomText
                    color={
                      menuItem.name === isShowChildMenu
                        ? colorStyle.white
                        : colorStyle.black
                    }
                  >
                    {menuItem.name}
                  </CustomText>
                </FlexBox>

                {menuItem.child ? (
                  <>
                    <MdArrowRight size={24} />
                    {isShowChildMenu === menuItem.child[0].parents ? (
                      <ChildMenuContainer>
                        {menuItem.child.map((childItem) => {
                          return (
                            <ChildMenuItem
                              key={childItem.id + childItem.name}
                              onClick={() => {
                                setIsShowMenu(false);
                                if (!childItem.name.includes("ready")) {
                                  //new 메뉴
                                  if (storageData.length < 10) {
                                    if (
                                      childItem.nav.includes("Card") &&
                                      !hasWindow(childItem.nav)
                                    )
                                      openWindow({
                                        id: Date.now(),
                                        type: childItem.nav,
                                        visible: true,
                                        title: "입력해주세요.",
                                        icon: "images/icons/keyboard.png",
                                        msg: <GetInfo />,
                                      });
                                    else if (
                                      childItem.nav.includes("Name") &&
                                      !hasWindow(childItem.nav)
                                    )
                                      openWindow({
                                        id: Date.now(),
                                        type: childItem.nav,
                                        visible: true,
                                        title: "입력해주세요.",
                                        icon: "images/icons/keyboard.png",
                                        msg: <GetInfoMore />,
                                      });
                                  } else setModalVisible(true); //10개면 더이상 저장 못한다고
                                }
                              }}
                            >
                              <CustomImg
                                imgSrc={childItem.icon}
                                width={24}
                                marginRight={7}
                              />
                              <CustomText>{childItem.name}</CustomText>
                            </ChildMenuItem>
                          );
                        })}
                      </ChildMenuContainer>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </ParentsMenuItem>

              {menuItem.name === "New" ? <BorderLine /> : <></>}
            </Fragment>
          );
        })}
      </ParentsMenuContainer>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msg="이름은 최대 10개 까지만 만들 수 있어요. 다른 이름을 생성하고 싶다면 폴더를 삭제해주세요."
        title={
          <FlexBox>
            <CustomImg
              imgSrc="images/icons/warning.png"
              width={22}
              marginRight={3}
            />

            <CustomText color={colorStyle.white}>Error!</CustomText>
          </FlexBox>
        }
      />
    </>
  );
};
