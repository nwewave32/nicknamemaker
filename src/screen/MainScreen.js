import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { CustomModal, CustomText, FlexBox, Window, CustomImg } from "component";
import { ControlBar } from "component/main/ControlBar";
import { needUpdateState, storageListState } from "lib/data/atom";
import { colorStyle, randomImgList } from "lib/data/styleData";
import { storageUtil } from "lib/util";

const BackgroundContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  height: 100vh;
  width: 100vw;

  position: relative;
  background: ${colorStyle.windowBackColor};
`;

const ContentContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  flex-wrap: wrap;
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 0;
  width: 100%;
  height: 33vh;
  overflow: hidden;
`;

const FolderContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "center",
})`
  margin: 10px 0;
  color: ${colorStyle.white};
`;

export default function MainScreen({}) {
  const dragBackground = useRef(null);
  const [windows, setWindows] = useState([]);

  const [storageData, setStorageData] = useRecoilState(storageListState);
  const resetStorage = useResetRecoilState(storageListState);
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);

  useLayoutEffect(() => {
    setWindows(() => {
      const introWindow = {
        id: Date.now(), // Unique ID for each window
        type: "intro",
        visible: true,
        title: "반가워요!",
        icon: "images/icons/hand.png",
        msg: (
          <>
            <CustomText>{"새 이름을 원할 경우"}</CustomText>
            <CustomText fontWeight="bold">{"Start > New > Name"}</CustomText>
            <CustomText>{""}</CustomText>
            <CustomText>{"새 신분증을 원할 경우"}</CustomText>
            <CustomText fontWeight="bold">{"Start > New > ID Card"}</CustomText>
          </>
        ), //todo: 한번에 적기
      };
      return [introWindow];
    });
  }, []);

  useEffect(() => {
    const getStorageData = async () => {
      const data = await storageUtil.getData();

      if (Array.isArray(data) && data.length > 0) setStorageData(data);
      setNeedUpdate(false);
    };
    if (needUpdate) {
      getStorageData();
    }
  }, [needUpdate]);

  useEffect(() => {
    //nameFunc();
    return () => {
      setNeedUpdate(false);
    };
  }, []);

  const openWindow = (newWindow) => {
    setWindows([...windows, newWindow]);
  };

  const toggleWindowVisibility = (id) => {
    setWindows(
      windows.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
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
        <ContentContainer>
          <FolderContainer
            onClick={async () => {
              await storageUtil.clearAll();
              resetStorage();
            }}
          >
            <CustomImg
              imgSrc="images/icons/bin_filled.png"
              width={32}
              style={{
                marginBottom: 2,
              }}
            />
            <FlexBox style={{ width: 80 }} justify="center">
              <CustomText color={colorStyle.white}>휴지통</CustomText>
            </FlexBox>
          </FolderContainer>
          {storageData &&
            Array.isArray(storageData) &&
            storageData.map((data, idx) => {
              return (
                <FlexBox
                  onClick={() => {
                    const params = { ...data, index: idx };
                    // navigation.navigate("FolderContent", params);
                  }}
                  key={data.number + data.name}
                  direction="column"
                  style={{ marginBottom: 10, marginLeft: 10 }}
                >
                  <CustomImg
                    imgSrc="images/icons/folder_32.png"
                    width={32}
                    style={{
                      marginBottom: 2,
                    }}
                  />
                  <FlexBox style={{ width: 80 }} justify="center">
                    <CustomText
                      color={colorStyle.white}
                      style={{
                        textOverflow: "ellipsis",
                        width: 80,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                      ellipsizeMode="tail"
                    >
                      {data.name}
                    </CustomText>
                  </FlexBox>
                </FlexBox>
              );
            })}
        </ContentContainer>

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
