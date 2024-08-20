import React from "react";

import bin from "../public/images/icons/bin_empty.png";
import { storageUtil } from "../lib/util";

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
      <img
        src={bin}
        style={{
          width: 24,
          height: 24,
          marginRight: 5,
        }}
      />
    </div>
  );
};
