const GlobalUtil = () => {
  const checkIsNull = (target) => {
    return target === "" || target === null || target === undefined;
  };

  return {
    checkIsNull: checkIsNull,
  };
};

const globalUtil = GlobalUtil();
export { globalUtil };
