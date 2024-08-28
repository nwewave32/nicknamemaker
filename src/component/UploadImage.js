import { useCallback, useEffect, useState, Fragment } from "react";
import {
  BottomSheet,
  CustomImg,
  FlexBox,
  FullContainer,
  CustomText,
} from "component";
import styled from "styled-components";
import { colorStyle, randomImgList } from "lib/data/styleData";

export const UploadImage = ({ photoSrc, setPhotoSrc }) => {
  const [photoIdx, setPhotoIdx] = useState();
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [btsVisible, setBtsVisible] = useState(false);

  const onchangeImageUpload = (e) => {
    setImgManageIdx(1);
    const { files } = e.target;
    console.log("##files", files);
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  const setRandomImg = () => {
    setImgManageIdx(0);
    setPhotoIdx(() => {
      const leng = randomImgList.length;
      const index = Math.floor(Math.random() * leng);
      return index;
    });
  };

  const photoSelArr = [
    {
      id: 0,
      title: "기본 사진 선택",
      type: "default",
      onChange: setRandomImg,
    },
    {
      id: 1,
      title: "사진 라이브러리에서 선택",
      type: "file",
      onChange: onchangeImageUpload,
    },
  ];
  const [imgManageIdx, setImgManageIdx] = useState(0); //selected idx in bts

  useEffect(() => {
    setPhotoSrc(uploadImgUrl);
  }, [uploadImgUrl]);

  useEffect(() => {
    if (imgManageIdx === 0) setPhotoSrc(randomImgList[photoIdx]);
  }, [imgManageIdx, photoIdx]);

  return (
    <>
      <FullContainer direction="column">
        <CustomImg
          imgSrc={imgManageIdx === 0 ? randomImgList[photoIdx] : uploadImgUrl}
          width={100}
        />

        <FullContainer
          onClick={() => setBtsVisible((prev) => !prev)}
          justify="center"
        >
          <CustomImg imgSrc="images/icons/camera_2.png" width={24} />
          <input
            name="idCardPhoto"
            id="idCardPhoto"
            type="file"
            style={{ visibility: "hidden", height: 0, width: 0 }}
            accept="image/*"
            capture="user"
            required
            onChange={(e) => {
              onchangeImageUpload(e);
            }}
          />
        </FullContainer>
      </FullContainer>
      <BottomSheet
        btsVisible={btsVisible}
        setBtsVisible={setBtsVisible}
        header="사진 옵션 선택"
        items={photoSelArr}
      />
    </>
  );
};

export default UploadImage;
