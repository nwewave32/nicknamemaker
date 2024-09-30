const StorageUtil = () => {
  const storeData = (value) => {
    const originVals = getData();
    const newVals = [...originVals, value];
    localStorage.setItem("folders", JSON.stringify(newVals));
  };

  const getData = () => {
    const values = localStorage.getItem("folders");

    const newValues = JSON.parse(values);

    return newValues || [];
  };

  const removeData = (id) => {
    const originVals = getData();
    const newVals = originVals.filter((item) => item.id !== id);
    localStorage.setItem("folders", JSON.stringify(newVals));
  };

  const clearAll = () => {
    localStorage.clear();
  };

  return {
    storeData: storeData,
    getData: getData,
    clearAll: clearAll,
    removeData: removeData,
  };
};

const storageUtil = StorageUtil();
export { storageUtil };
