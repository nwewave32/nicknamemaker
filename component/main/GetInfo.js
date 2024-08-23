import React, { useEffect, useState, Fragment } from "react";
import { colorStyle, randomImgList } from "/lib/data/styleData";
import {
  FlexBox,
  BottomSheet,
  CustomText,
  CustomButton,
  InputBox,
  UploadImage,
  CopyWindow,
} from "/component";
import styled from "styled-components";
import moment from "moment";
import { CustomImg } from "/component";
import { FullContainer } from "../GlobalStyles";

export const GetInfo = ({}) => {
  const [pageIdx, setPageIdx] = useState(0);
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [nextDisabled, setNextDisabled] = useState(false);

  const photoSelArr = ["기본 사진 선택", "사진 라이브러리에서 선택"];
  const [imgManageIdx, setImgManageIdx] = useState(0);

  const [inputFocused, setInputtFocused] = useState(false); //todo: remove?
  const [btsVisible, setBtsVisible] = useState(false);

  const pageArr = [
    {
      id: 0,
      title: "이름",
      placeholder: "예)구은재",
      value: nameText,
      setFunc: setNameText,
      inputMode: "text",
      buttonType: "next",
    },
    {
      id: 1,
      title: "지역",
      placeholder: "예)동해",
      value: locationText,
      setFunc: setLocationText,
      inputMode: "text",
      buttonType: "next",
    },
    {
      id: 2,
      title: "생일",
      placeholder: "예)19970324",
      value: birthdayText,
      setFunc: setBirthdayText,
      inputMode: "date",
      buttonType: "next",
    },
    {
      id: 3,
      title: "사진",
      value: photoSrc,
      setFunc: setPhotoSrc,
      buttonType: "done",
    },
  ];

  useEffect(() => {
    let isValidBirth = moment(birthdayText, "YYYY-MM-DD", true).isValid();

    if (
      (pageIdx === 0 && nameText.trim() === "") ||
      (pageIdx === 1 && locationText.trim() === "") ||
      (pageIdx === 2 && (birthdayText.trim() === "" || !isValidBirth)) ||
      (pageIdx === 3 && photoSrc === "")
    )
      setNextDisabled(true);
    else setNextDisabled(false);

    // if (pageIdx === 2 && !isValidBirth)
    //   setBirthdayError("생년월일을 8자리 정수 형식으로 입력해주세요.");
    // else setBirthdayError("");
  }, [pageIdx, locationText, nameText, birthdayText, photoSrc]);

  const handleSelectPhoto = () => {
    setBtsVisible(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setPhotoSrc(result.assets[0].uri);
    //   setBtsVisible(false);
    // }
  };

  const handleBts = (idx) => {
    setImgManageIdx(idx);
    if (idx === 0) {
      setPhotoSrc(() => {
        const leng = randomImgList.length;
        const idx = Math.floor(Math.random() * (leng - 0));
        return idx;
      });
      setBtsVisible(false);
    } else if (idx === 1) pickImage();
  };

  return (
    <>
      {pageArr.map((pageItem, idx) => {
        if (pageIdx === pageItem.id)
          return (
            <Fragment key={idx + ". " + pageItem.title}>
              {pageItem.id < 3 && (
                <InputBox
                  title={pageItem.title}
                  changeCallback={pageItem.setFunc}
                  textValue={pageItem.value}
                  placeholder={pageItem.placeholder}
                  inputMode={pageItem.inputMode}
                  onFocus={(e) => {
                    setInputtFocused(true);
                  }}
                  onBlur={(e) => {
                    setInputtFocused(false);
                  }}
                  autoFocus={true}
                  hasError={birthdayError !== ""}
                  errorMsg={birthdayError}
                />
              )}

              {pageItem.id === 3 && (
                <FullContainer style={{ marginBottom: 20 }}>
                  <div onClick={handleSelectPhoto}>
                    <CustomImg imgSrc="images/icons/camera_2.png" width={24} />
                  </div>

                  {/* <UploadImage /> */}
                  {/*
                          <FlexBox style={{ padding: 20 }} onClick={handleSelectPhoto}>
                            <img src={camera} width={24} />
                          </FlexBox>
                        
                        <input type="file" accept="image/*" /> */}
                  {photoSrc !== "" ? (
                    <CustomImg
                      imgSrc={
                        imgManageIdx === 0
                          ? randomImgList[photoSrc]
                          : { uri: photoSrc }
                      }
                      width={100}
                      marginRight={5}
                    />
                  ) : (
                    <></>
                  )}
                </FullContainer>
              )}

              {/* button area */}
              <FlexBox>
                {pageItem.id !== 0 && (
                  <>
                    <CustomButton
                      text="prev"
                      pressCallback={() => {
                        setPageIdx(idx - 1);
                      }}
                    />
                    <FlexBox style={{ width: 100, height: 10 }}></FlexBox>
                  </>
                )}
                <CustomButton
                  text={pageItem.buttonType}
                  pressCallback={() => {
                    if (pageItem.buttonType === "done") {
                      navigation.navigate("IdCardMain", {
                        name: nameText,
                        photoIdx: imgManageIdx,
                        photo: photoSrc,
                        location: locationText,
                        birthday: birthdayText, //todo: recoil atom
                      });
                      setInputWindowDelete(true);
                    } else setPageIdx(idx + 1);
                  }}
                  disabled={nextDisabled}
                />
              </FlexBox>
            </Fragment>
          );
      })}
      <BottomSheet
        btsVisible={btsVisible}
        setBtsVisible={setBtsVisible}
        header="사진 옵션 선택"
        items={photoSelArr}
        callback={handleBts}
      ></BottomSheet>
    </>
  );
};
