import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import {
  FlexBox,
  CustomButton,
  ShareModal,
  CustomImg,
  CustomText,
  CustomToast,
} from "component";
import { useRecoilState, useResetRecoilState } from "recoil";
import { needUpdateState, storageListState } from "lib/data/atom";

import { colorStyle } from "lib/data/styleData";
import { zodiac } from "lib/data/constant";
import moment from "moment";
import html2canvas from "html2canvas";
import { globalUtil } from "lib/util";

const CardContainer = styled(FlexBox)`
  width: 400px;
  height: 300px;
`;

const LeftContainer = styled(FlexBox)`
  flex: 3;
  width: 100%;
  height: 100%;
  padding: 10px 0;
`;

const RightContainer = styled(FlexBox)`
  flex: 4;
  width: 100%;
  height: 100%;
`;

const FirstColTop = styled(FlexBox)`
  flex: 6;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
`;

const IdPhotoImg = styled.div`
  background-color: ${colorStyle.white};
  border-radius: 100%;
  border-color: ${colorStyle.headerColor};
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const ButtonContainer = styled(FlexBox)`
  padding: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${colorStyle.headerColor};
`;

const FirstColBottom = styled(FlexBox)`
  flex: 2;
  width: 100%;
  height: 100%;
  padding-top: 5px;
`;

const SecondCol = styled(FlexBox)`
  padding: 10px 0;
  flex: 1;
  width: 100%;
  height: 100%;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: ${colorStyle.headerColor};
  border-left-style: solid;
  border-left-color: ${colorStyle.headerColor};
  border-left-width: 1px;
  box-sizing: border-box;
`;

const ThirdCol = styled(FlexBox)`
  padding: 10px 0;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const TitleText = styled(CustomText)`
  margin-bottom: 15px;
`;
const ContentText = styled(CustomText)``;

const BlockContainer = styled(FlexBox).attrs((props) => ({
  direction: "column",
}))`
  width: 100%;
  padding: 8px;
`;

const Border = styled.div`
  border-bottom-color: ${colorStyle.headerColor};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  width: 90%;
`;

export const IdCard = ({ info, id }) => {
  const [storageData, setStorageData] = useRecoilState(storageListState);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const nowUrl = window.location.href;

  const getZodiacImage = (paraZodiac) => {
    let target = "images/zodiac/";
    zodiac.forEach((item) => {
      if (item.name === paraZodiac) target += item.value;
    });
    target += ".png";
    return target;
  };

  const saveAsImageHandler = () => {
    const target = document.getElementById(id);

    if (!target) {
      return alert("결과 저장에 실패했습니다.");
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = `${info.name}.png`;
      link.click();
      document.body.removeChild(link);
    });
  };

  const saveAsFolder = () => {
    const isNull = storageData.find((item) => item.id === id);
    if (globalUtil.checkIsNull(isNull))
      setStorageData((prev) => {
        const newItem = {
          ...info,
          id: id,
        };
        return [...prev, newItem];
      });
    else {
      setToastMsg("중복된 이름이 있습니다");
      setToastVisible(true);
    }
  };

  return (
    <>
      <CardContainer>
        <LeftContainer direction="column">
          <FirstColTop direction="column" justify="space-between">
            <IdPhotoImg>
              <CustomImg imgSrc={info.photo} />
            </IdPhotoImg>
            <ButtonContainer>
              <CustomButton
                margin={{ right: "5px" }}
                text="Share"
                pressCallback={() => setModalVisible(true)}
              />

              <CustomButton
                margin={{ right: "5px" }}
                text="Download"
                pressCallback={() => saveAsImageHandler()}
              />
              <CustomButton
                margin={{ right: "5px" }}
                text="Save"
                pressCallback={() => saveAsFolder()}
              />
            </ButtonContainer>
          </FirstColTop>
          <FirstColBottom justify="center">
            <CustomText fontWeight="bold" fontSize={20} textAlign="center">
              {info.name}
            </CustomText>
          </FirstColBottom>
        </LeftContainer>
        <RightContainer>
          <SecondCol direction="column" justify="space-between">
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Location
              </TitleText>

              <ContentText fontSize={10}>{info.location}</ContentText>
            </BlockContainer>
            <Border />
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Birthday
              </TitleText>

              <ContentText fontSize={10}>{info.birthday}</ContentText>
            </BlockContainer>
            <Border />
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Zodiac Sign
              </TitleText>
              <CustomImg imgSrc={getZodiacImage(info.zodiac)} />
            </BlockContainer>
          </SecondCol>
          <ThirdCol direction="column" justify="space-between">
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Pride
              </TitleText>

              <ContentText fontSize={10}>{info.pride}</ContentText>
            </BlockContainer>
            <Border />
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Blood Type
              </TitleText>

              <ContentText fontSize={10}>{info.bloodType}</ContentText>
            </BlockContainer>
            <Border />
            <BlockContainer>
              <TitleText fontSize={12} fontWeight="bold">
                Issued Date
              </TitleText>

              <ContentText fontSize={10}>
                {moment().format("YYYY-MM-DD")}
              </ContentText>
            </BlockContainer>
            <Border />
            <BlockContainer>
              <CustomText fontSize={8} color={colorStyle.darkGray}>
                Copyright 2021. KIMHAMIN. All rights reserved.
              </CustomText>
            </BlockContainer>
          </ThirdCol>
        </RightContainer>
      </CardContainer>
      <ShareModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nowUrl={nowUrl}
        setToastMsg={setToastMsg}
        setToastVisible={setToastVisible}
      />
      {toastVisible && (
        <CustomToast
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          msg={toastMsg}
        />
      )}
    </>
  );
};
