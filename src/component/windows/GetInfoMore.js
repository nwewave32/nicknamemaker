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
  CustomDatePicker,
  StyledFormContainer,
  CustomDropDown,
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
import {
  windowsState,
  closeWindowSelector,
  openWindowSelector,
} from "lib/data/atom";

import { globalUtil } from "lib/util";
import { NewName } from "component/windows";

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
  box-sizing: border-box;
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
  min-width: 500px;
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

const LeftContainer = styled(FlexBox)`
  flex: 4;
`;

const RightContainer = styled(FlexBox)`
  flex: 1;
`;

const Frame = ({ children, ...rest }) => {
  return (
    <OuterContainer>
      <InnerContainer style={rest.style}>{children}</InnerContainer>
    </OuterContainer>
  );
};

export const GetInfoMore = ({ id }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["1", "2", "3"];
  const [isDisabled, setIsDisabled] = useState(true);

  const openWindow = useSetRecoilState(openWindowSelector);
  const closeWindow = useSetRecoilState(closeWindowSelector);
  // tab1
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [photoSrc, setPhotoSrc] = useState("");
  // tab2
  const [bloodType, setBloodType] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [prideText, setPrideText] = useState("");
  //tab3
  const [vibe, setVibe] = useState(1);
  const vibeArr = [
    "white",
    "pink",
    "black",
    "yellow",
    "brown",
    "blue",
    "green",
    "purple",
  ];

  useEffect(() => {
    if (
      locationText.trim() === "" ||
      birthdayText.trim() === "" ||
      globalUtil.checkIsNull(photoSrc) ||
      prideText.length > 50
    )
      setIsDisabled(true);
    else setIsDisabled(false);
  }, [locationText, birthdayText, photoSrc, prideText]);

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
              placeholder="예) 동해"
              inputMode="text"
              autoFocus={true}
              isRequired={true}
            />

            <CustomDatePicker
              title="생일"
              changeCallback={setBirthdayText}
              dateValue={birthdayText}
              placeholder="예) 1997-03-24"
              isRequired={true}
            />
            <StyledFormContainer title="사진" isRequired={true}>
              {!globalUtil.checkIsNull(photoSrc) && (
                <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
              )}
            </StyledFormContainer>

            <Frame>
              {!globalUtil.checkIsNull(photoSrc) ? (
                <CustomImg imgSrc={photoSrc} width={100} />
              ) : (
                <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
              )}
            </Frame>
          </>
        ) : tabIndex === 1 ? (
          <>
            <CustomDropDown
              title="혈액형"
              changeCallback={setBloodType}
              value={bloodType}
              options={["A", "B", "O", "AB"]}
            />
            <CustomDropDown
              title="별자리"
              changeCallback={setZodiac}
              value={zodiac}
              options={[
                "양자리",
                "황소자리",
                "쌍둥이자리",
                "게자리",
                "사자자리",
                "처녀자리",
                "천칭자리",
                "전갈자리",
                "사수자리",
                "염소자리",
                "물병자리",
                "물고기자리",
              ]}
            />
            <InputBox
              title="자랑거리"
              changeCallback={setPrideText}
              textValue={prideText}
              placeholder="예) 강아지가 귀여움 (50자 이하)"
              inputMode="text"
              autoFocus={true}
              multiline={true}
              hasError={prideText.length > 50}
              errorMsg="글자수가 너무 많아요!"
            />
          </>
        ) : (
          <>
            <FullContainer justify="space-around">
              <LeftContainer>
                <Frame
                  style={{
                    height: "250px",
                    width: "180px",
                    backgroundImage: `url(images/vibes/vibes.00${vibe}.png)`,
                    backgroundSize: "cover",
                  }}
                />
              </LeftContainer>
              <RightContainer direction="column">
                {/* todo: design */}
                {vibeArr.map((item, idx) => (
                  <CustomButton
                    key={item}
                    text={(idx + 1).toString()}
                    pressCallback={() => {
                      setVibe(idx + 1);
                    }}
                    margin={{ bottom: "10px", right: "30px" }}
                  />
                ))}
              </RightContainer>
            </FullContainer>
          </>
        )}
      </ContentsContainer>

      <FullContainer justify="flex-end">
        <CustomButton
          text="Apply"
          pressCallback={() => {
            const info = {
              location: locationText,
              birthday: birthdayText,
              photo: photoSrc,
              bloodType: bloodType,
              zodiac: zodiac,
              pride: prideText,
              vibe: {
                id: vibe,
                name: vibeArr[vibe - 1],
              },
            };
            closeWindow(id);
            const nowDt = Date.now();
            openWindow({
              id: nowDt,
              type: "Name",
              visible: true,
              title: "New Name!",
              icon: "images/icons/user_32.png",
              msg: <NewName id={nowDt} info={info} />,
              zIndex: 10,
              isActive: true,
            });
          }}
          disabled={isDisabled}
          highlight={true}
          width="20%"
          margin={{ right: "5px" }}
        />
        <CustomButton
          text="Cancel"
          pressCallback={() => {
            closeWindow(id);
          }}
          width="20%"
        />
      </FullContainer>
    </>
  );
};
