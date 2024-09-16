import nameList from "../nameCollection.json";

const MakeNameUtil = () => {
  const makeNameFuncMain = (middleName, vibe) => {
    let result = {
      first: getName(nameList.firstName[vibe]),
      middle: middleName ? getName(nameList.middleName) : false,
      last: getName(nameList.lastName),
    };

    return result;
  };

  const getName = (list) => {
    let targetNameList = [...list];
    const leng = targetNameList.length;
    const idx = Math.floor(Math.random() * (leng - 0));
    return targetNameList[idx];
  };

  return {
    makeNameFuncMain: makeNameFuncMain,
  };
};

const makeNameUtil = MakeNameUtil();
export { makeNameUtil };
