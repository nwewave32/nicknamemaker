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

import { FullContainer } from "../GlobalStyles";

export const GetInfo = ({}) => {
  const [pageIdx, setPageIdx] = useState(0);
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [nextDisabled, setNextDisabled] = useState(false);

  const [inputFocused, setInputtFocused] = useState(false); //todo: remove?

  useLayoutEffect(() => {
    setBirthdayText(() => {
      const today = moment().format("YYYY-MM-DD");
      return today;
    });
  }, []);

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
                  <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
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
                      // navigation.navigate("IdCardMain", {
                      //   name: nameText,
                      //   // photoIdx: imgManageIdx,
                      //   photo: photoSrc,
                      //   location: locationText,
                      //   birthday: birthdayText, //todo: recoil atom
                      // });
                      // setInputWindowDelete(true);
                    } else setPageIdx(idx + 1);
                  }}
                  disabled={nextDisabled}
                />
              </FlexBox>
            </Fragment>
          );
      })}
    </>
  );
};
