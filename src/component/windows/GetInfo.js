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
import { useSetRecoilState } from "recoil";
import { closeWindowSelector, openWindowSelector } from "lib/data/atom";
import { IdCard } from "component/windows";
import { globalUtil } from "lib/util";

const EmptySpace = styled.div`
  width: 100px;
  height: 10px;
`;

const PaddingContainer = styled.div`
  padding: 10px;
  min-width: 350px;
`;

const ButtonArea = styled(FlexBox).attrs({
  justify: "space-around",
})`
  width: 100%;
`;

export const GetInfo = ({ id }) => {
  const [pageIdx, setPageIdx] = useState(0);
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [nextDisabled, setNextDisabled] = useState(false);

  const [inputFocused, setInputtFocused] = useState(false); //todo: remove?
  const openWindow = useSetRecoilState(openWindowSelector);
  const closeWindow = useSetRecoilState(closeWindowSelector);
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
      placeholder: "예) 구은재",
      value: nameText,
      setFunc: setNameText,
      inputMode: "text",
      buttonType: "Next >",
    },
    {
      id: 1,
      title: "지역",
      placeholder: "예) 동해",
      value: locationText,
      setFunc: setLocationText,
      inputMode: "text",
      buttonType: "Next >",
    },
    {
      id: 2,
      title: "생일",
      placeholder: "예) 19970324",
      value: birthdayText,
      setFunc: setBirthdayText,
      inputMode: "date",
      buttonType: "Next >",
    },
    {
      id: 3,
      title: "사진",
      value: photoSrc,
      setFunc: setPhotoSrc,
      buttonType: "OK",
    },
  ];

  useEffect(() => {
    let isValidBirth = moment(birthdayText, "YYYY-MM-DD", true).isValid();

    if (
      (pageIdx === 0 && nameText.trim() === "") ||
      (pageIdx === 1 && locationText.trim() === "") ||
      (pageIdx === 2 && (birthdayText.trim() === "" || !isValidBirth)) ||
      (pageIdx === 3 && globalUtil.checkIsNull(photoSrc))
    )
      setNextDisabled(true);
    else setNextDisabled(false);

    // if (pageIdx === 2 && !isValidBirth)
    //   setBirthdayError("생년월일을 8자리 정수 형식으로 입력해주세요.");
    // else setBirthdayError("");
  }, [pageIdx, locationText, nameText, birthdayText, photoSrc]);

  return (
    <PaddingContainer>
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
                  {!globalUtil.checkIsNull(photoSrc) && (
                    <CustomImg imgSrc={photoSrc} width={100} />
                  )}
                  <UploadImage photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
                  {/* todo: remove bottom sheet */}
                </FullContainer>
              )}

              {/* button area */}
              <ButtonArea>
                {pageItem.id !== 0 && (
                  <>
                    <CustomButton
                      text="< Back"
                      pressCallback={() => {
                        setPageIdx(idx - 1);
                      }}
                      width="auto"
                    />
                  </>
                )}
                <CustomButton
                  text={pageItem.buttonType}
                  pressCallback={() => {
                    if (pageItem.buttonType === "OK") {
                      const info = {
                        name: nameText,
                        location: locationText,
                        birthday: birthdayText,
                        photo: photoSrc,
                      };
                      closeWindow(id);
                      openWindow({
                        id: Date.now(),
                        type: "IdCard",
                        visible: true,
                        title: "New Id Card!",
                        icon: "images/icons/card.png",
                        msg: <IdCard info={info} />,
                        zIndex: 10,
                        isActive: true,
                      });
                    } else setPageIdx(idx + 1);
                  }}
                  width="auto"
                  disabled={nextDisabled}
                  highlight={pageItem.buttonType === "OK"}
                />
              </ButtonArea>
            </Fragment>
          );
      })}
    </PaddingContainer>
  );
};
