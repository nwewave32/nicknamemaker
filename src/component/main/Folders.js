import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  needUpdateState,
  storageListState,
  openWindowSelector,
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

  const getStorageData = () => {
    const data = storageUtil.getData();
    console.log("##data", data);
    if (Array.isArray(data) && data.length > 0) setStorageData(data);
    setNeedUpdate(false);
  };

  useLayoutEffect(() => {
    getStorageData();
  }, []);
  useEffect(() => {
    if (needUpdate) {
      getStorageData();
      console.log("##needUpdate", needUpdate);
    }
  }, [needUpdate]);

  useEffect(() => {
    return () => {
      setNeedUpdate(false);
    };
  }, []);

  return (
    <ContentContainer>
      <FolderContainer
        onClick={() => {
          storageUtil.clearAll();
          //todo: close window
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
