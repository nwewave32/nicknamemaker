import { atom } from "recoil";

export const needUpdateState = atom({
  key: "needUpdateState",
  default: true,
});

export const storageListState = atom({
  key: "storageListState",
  default: [],
});

export const isShowMenuState = atom({
  key: "isShowMenuState",
  default: false,
});

export const windowsState = atom({
  key: "windowsState",
  default: [],
});
