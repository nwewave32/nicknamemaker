import React, { useEffect, useState, Fragment, useLayoutEffect } from "react";
import { colorStyle, randomImgList } from "lib/data/styleData";
import {
  FlexBox,
  BottomSheet,
  CustomText,
  CustomButton,
  InputBox,
  UploadImage,
  CopyWindow,
  CustomImg,
} from "component";
import styled from "styled-components";
import moment from "moment";
import {
  InputContainer,
  TitleContainer,
  ContentContainer,
  BorderBox,
  FullContainer,
} from "component/GlobalStyles";

import { useSetRecoilState } from "recoil";
import { windowsState } from "lib/data/atom";
import { IdCard } from "./IdCard";
import { globalUtil } from "lib/util";

const TabBox = styled(BorderBox).attrs({
  justify: "center",
})`
  width: 50px;
  min-height: 10px;
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-bottom: ${(props) =>
    props.selected ? `1px solid ${colorStyle.backgroundColor}` : "none"};
  position: relative;
`;

const UnderBar = styled.div`
  position: absolute;
  width: 100%;
  bottom: -2px;
  left: 0px;
  height: 1px;

  background-color: ${colorStyle.backgroundColor};
  z-index: 99;
`;

const ContentsContainer = styled(BorderBox)`
  width: 100%;
  box-sizing: border-box;
  border-width: 1px;
  min-height: 300px;
  margin-bottom: 5px;
  padding: 10px;
`;

const OuterContainer = styled(BorderBox)`
  background-color: ${colorStyle.backgroundColor};
  border-width: 1px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
`;
const InnerContainer = styled(BorderBox)`
  background-color: ${colorStyle.windowBackColor};
  border-width: 1px;
  border-color: ${colorStyle.black} ${colorStyle.white} ${colorStyle.white}
    ${colorStyle.black};
  min-height: 80px;
  min-width: 100px;
  box-shadow: -1px -1px 1px 1px rgba(0, 0, 0, 0.3);
`;

export const GetInfoMore = ({}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["1", "2", "3"];
  const [isDisabled, setIsDisabled] = useState(true);

  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");

  useEffect(() => {
    console.log("##photoSrc", photoSrc);
  }, [photoSrc]);

  return (
    <>
      <FullContainer>
        {tabs.map((tab, idx) => (
          <Fragment key={tab + idx}>
            <TabBox
              onClick={() => setTabIndex(idx)}
              selected={tabIndex === idx}
            >
              <CustomText>{tab}</CustomText>
              {tabIndex === idx && <UnderBar />}
            </TabBox>
          </Fragment>
        ))}
      </FullContainer>

      <ContentsContainer direction="column">
        {tabIndex === 0 ? (
          <>
            <InputBox
              title="지역"
              changeCallback={setLocationText}
              textValue={locationText}
              placeholder="예)동해"
              inputMode="text"
              autoFocus={true}
            />
            <InputBox
              title="생일"
              changeCallback={setBirthdayText}
              textValue={birthdayText}
              placeholder="예)19970324"
              inputMode="date"
              autoFocus={true}
            />
            <InputContainer>
              {/* <CustomText style={{ flex: 3, paddingTop: 3 }}>{title}</CustomText> */}
              <TitleContainer>
                <CustomText>사진</CustomText>
              </TitleContainer>

              <ContentContainer>
                {!globalUtil.checkIsNull(photoSrc) && (
                  <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
                )}
              </ContentContainer>
            </InputContainer>
            <OuterContainer>
              <InnerContainer>
                {!globalUtil.checkIsNull(photoSrc) ? (
                  <CustomImg imgSrc={photoSrc} width={100} />
                ) : (
                  <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
                )}
              </InnerContainer>
            </OuterContainer>
          </>
        ) : tabIndex === 1 ? (
          <>content2</>
        ) : (
          <>content3</>
        )}
      </ContentsContainer>

      <FullContainer justify="flex-end">
        <CustomButton
          text="Apply"
          pressCallback={() => {
            console.log("##apply");
          }}
          disabled={isDisabled}
          highlight={true}
          style={{ width: "20%", marginRight: "5px" }}
        />
        <CustomButton
          text="Cancel"
          pressCallback={() => {
            console.log("##cancel");
          }}
          style={{ width: "20%" }}
        />
      </FullContainer>
    </>
  );
};
