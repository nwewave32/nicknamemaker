import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  needUpdateState,
  storageListState,
  openWindowSelector,
  closeWindowSelector,
  windowsState,
} from "lib/data/atom";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { WindowBox, CustomText, CustomImg, FlexBox } from "component";

import { storageUtil } from "lib/util";
import { IdCard } from "component/windows";
import { TYPE } from "lib/data/constant";

const ContentContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 0;
  width: 100%;

  overflow: hidden;
`;

const FolderContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "center",
})`
  margin: 10px 0;
  color: ${colorStyle.white};
`;

export const Folders = ({}) => {
  const [storageData, setStorageData] = useRecoilState(storageListState);
  const resetStorage = useResetRecoilState(storageListState);
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);
  const openWindow = useSetRecoilState(openWindowSelector);
  const closeWindow = useSetRecoilState(closeWindowSelector);
  const windows = useRecoilValue(windowsState);

  const getStorageData = () => {
    const data = storageUtil.getData();

    if (Array.isArray(data) && data.length > 0) setStorageData(data);
    setNeedUpdate(false);
  };

  useLayoutEffect(() => {
    getStorageData();
  }, []);
  useEffect(() => {
    if (needUpdate) {
      getStorageData();
    }
  }, [needUpdate]);

  useEffect(() => {
    return () => {
      setNeedUpdate(false);
    };
  }, []);

  const clearData = () => {
    for (let index = 0; index < storageData.length; index++) {
      const item = storageData[index];

      closeWindow(item.id);
    }
    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];

      if (window.type === TYPE.SAVEDCARD) closeWindow(window.id);
    }
    //이거 끝나고 꺼져야 함
    storageUtil.clearAll();

    resetStorage();
  };

  return (
    <ContentContainer>
      <FolderContainer onClick={() => clearData()}>
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
                const nowDt = Date.now();
                openWindow({
                  id: nowDt,
                  type: TYPE.SAVEDCARD,
                  visible: true,
                  title: data.name,
                  icon: "images/icons/save.png",
                  msg: <IdCard id={nowDt} info={data} forSave={true} />,
                  zIndex: 10,
                  isActive: true,
                });
              }}
              key={data.number + data.name}
              direction="column"
              style={{ marginBottom: 10 }}
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
  );
};
