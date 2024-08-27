import React from "react";
import { storageUtil } from "lib/util";
import { CustomImg } from "./CustomImg";

export const DeleteBtnInHeader = ({ route, navigation }) => {
  // const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);
  return (
    <div
      onClick={async () => {
        const data = await storageUtil.getData();
        const filteredData = data.filter(
          (item, idx) =>
            idx !== route.params.index || item.number !== route.params.number
        );
        console.log("##filteredData", filteredData);
        const jsonValue = JSON.stringify(filteredData);
        const result = await storageUtil.updateData(jsonValue);
        if (result === "success") {
          navigation.push("AppMain", { needUpdate: true });
          //setNeedUpdate(true);
        } else
          alert("", "삭제에 실패했습니다. 잠시후 다시 시도해주세요.", [
            { text: "확인", onPress: () => {} },
          ]);
      }}
    >
      <CustomImg
        imgSrc="images/icons/bin_empty.png"
        width={24}
        marginRight={5}
      />
    </div>
  );
};
