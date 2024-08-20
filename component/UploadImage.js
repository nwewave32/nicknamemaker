import { useState } from "react";
import camera from "../public/images/icons/camera_2.png";

export const UploadImage = (props) => {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };
  return (
    <div className="UploadImage">
      <img src={uploadImgUrl} img="img" />
      <label htmlFor="photo">
        <img src={camera} width={24} />
      </label>

      <input
        name="photo"
        id="photo"
        type="file"
        style={{ visibility: "hidden" }}
        accept="image/*"
        onChange={onchangeImageUpload}
      />
    </div>
  );
};

export default UploadImage;
