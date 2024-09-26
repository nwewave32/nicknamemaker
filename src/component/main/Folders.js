import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { needUpdateState, storageListState } from "lib/data/atom";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { WindowBox, CustomText, CustomImg, FlexBox } from "component";

import { storageUtil } from "lib/util";

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

export const Folders = ({}) => {
  const [storageData, setStorageData] = useRecoilState(storageListState);
  const resetStorage = useResetRecoilState(storageListState);
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);

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

  return (
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
  );
};
