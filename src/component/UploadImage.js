import { useCallback, useEffect, useState, Fragment } from "react";
import {
  BottomSheet,
  CustomImg,
  CustomButton,
  FullFullContainer,
  CustomModal,
  FullContainer,
} from "component";
import styled from "styled-components";
import { colorStyle, randomImgList } from "lib/data/styleData";
import { globalUtil } from "lib/util";

export const UploadImage = ({ photoSrc, setPhotoSrc }) => {
  const [photoIdx, setPhotoIdx] = useState();
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible((prev) => !prev);
  };

  const setRandomImg = () => {
    setImgManageIdx(0);
    setPhotoIdx(() => {
      const leng = randomImgList.length;
      const index = Math.floor(Math.random() * leng);
      return index;
    });
  };

  const [imgManageIdx, setImgManageIdx] = useState(0); //selected idx in bts

  useEffect(() => {
    if (!globalUtil.checkIsNull(uploadImgUrl)) setPhotoSrc(uploadImgUrl);
  }, [uploadImgUrl]);

  useEffect(() => {
    if (imgManageIdx === 0 && !globalUtil.checkIsNull(photoIdx))
      setPhotoSrc(randomImgList[photoIdx]);
  }, [imgManageIdx, photoIdx]);

  const hasImgSrc = useCallback(() => {
    return (
      (imgManageIdx === 0 && randomImgList[photoIdx]) ||
      (imgManageIdx === 1 && uploadImgUrl)
    );
  }, [imgManageIdx, photoIdx, uploadImgUrl]);

  return (
    <>
      <FullFullContainer direction="column">
        <FullFullContainer
          onClick={() => setModalVisible((prev) => !prev)}
          justify="center"
          id="rtrt"
        >
          <CustomImg
            imgSrc="images/icons/camera_2.png"
            width={24}
            style={{ cursor: "pointer" }}
          />
        </FullFullContainer>
      </FullFullContainer>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        msg={
          <>
            <FullContainer>
              <CustomButton
                text="기본 사진 선택"
                margin={{ right: "5px" }}
                pressCallback={() => setRandomImg()}
              />
              <label
                htmlFor="idCardPhoto"
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <CustomButton
                  margin={{ right: "5px" }}
                  text="사진 라이브러리에서 선택"
                  pressCallback={(e) => e.stopPropagation()}
                />
              </label>
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
          </>
        }
        icon="images/icons/camera_1.png"
        title="사진 옵션 선택"
      />
    </>
  );
};

export default UploadImage;
