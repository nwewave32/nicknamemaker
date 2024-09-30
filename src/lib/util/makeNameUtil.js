import nameList from "../nameCollection.json";

const MakeNameUtil = () => {
  const makeNameFuncMain = (hasMiddleName, vibe) => {
    let result;

    let firstName = getName(nameList.firstName[vibe]);
    let middleName = hasMiddleName ? getName(nameList.middleName) : false;
    let lastName = getName(nameList.lastName);
    if (firstName.length + middleName.length + lastName.length > 15) {
      lastName = "도";
      middleName = false;
    } else {
      result = {
        first: firstName,
        middle: middleName,
        last: lastName,
      };
    }

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
