import { useEffect, useState } from "react";
import { BottomSheet, CustomImg, FlexBox, FullContainer } from "component";
import styled from "styled-components";
import { colorStyle, randomImgList } from "lib/data/styleData";

export const UploadImage = ({ photoSrc, setPhotoSrc }) => {
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [btsVisible, setBtsVisible] = useState(false);
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };
  const photoSelArr = [
    {
      id: 0,
      title: "기본 사진 선택",
      type: "text",
    },
    {
      id: 1,
      title: "사진 라이브러리에서 선택",
      type: "file",
      onChange: onchangeImageUpload,
    },
  ];
  const [imgManageIdx, setImgManageIdx] = useState(0); //이게 뭐지

  const handleBts = (e, idx) => {
    setImgManageIdx(idx);
    if (idx === 0) {
      //기본 사진 랜덤 돌리기 todo: 기본 사진 변경
      setPhotoSrc(() => {
        const leng = randomImgList.length;
        const index = Math.floor(Math.random() * leng);
        return index;
      });
      setBtsVisible(false);
    } else if (idx === 1) {
      console.log("##?");
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log("##uploadImgUrl", uploadImgUrl);
  }, [uploadImgUrl]);

  useEffect(() => {
    console.log("##photoSrc", photoSrc);
  }, [photoSrc]);

  return (
    <>
      <FullContainer direction="column">
        <CustomImg
          imgSrc={imgManageIdx === 0 ? randomImgList[photoSrc] : uploadImgUrl}
          width={100}
        />

        <FullContainer
          onClick={() => setBtsVisible((prev) => !prev)}
          justify="center"
        >
          <CustomImg imgSrc="images/icons/camera_2.png" width={24} />
        </FullContainer>
      </FullContainer>
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

export default UploadImage;
