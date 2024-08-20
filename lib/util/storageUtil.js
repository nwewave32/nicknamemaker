const StorageUtil = () => {
  const storeData = async (value) => {
    try {
      const storageKey = value.name;
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(storageKey, jsonValue);
      return "success";
    } catch (err) {
      console.log("##err in setItem", err);
      return "error";
    }
  };

  const updateData = async (value) => {
    try {
      const storageKey = value.name;
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(storageKey, jsonValue);
      return "success";
    } catch (err) {
      console.log("##err in updateData", err);
      return "error";
    }
  };

  const getData = async () => {
    try {
      const values = await getMultiple();
      const newValues = values.map((item) => {
        return JSON.parse(item[1]);
      });
      console.log("##newValues", newValues);
      return newValues;
    } catch (err) {
      console.log("##err in getData", err);
    }
  };

  const removeValue = async (storageKey) => {
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  const clearAll = async () => {
    try {
      localStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Clear.");
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = localStorage.getAllKeys();
      return keys;
    } catch (err) {
      // console.log("##err in getAllKeys", err);
    }
  };

  const getMultiple = async () => {
    let values;
    try {
      const keys = await getAllKeys();
      if (keys && keys.length > 0)
        try {
          values = localStorage.multiGet(keys);
          return values;
        } catch (err) {
          console.log("##err in getMultiple", err);
        }
    } catch (err) {
      console.log("##err in getMultiple", err);
    }
  };

  return {
    storeData: storeData,
    getData: getData,
    removeValue: removeValue,
    updateData: updateData,
    clearAll: clearAll,
  };
};

const storageUtil = StorageUtil();
export { storageUtil };
