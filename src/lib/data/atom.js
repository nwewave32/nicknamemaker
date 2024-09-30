import { atom, selector } from "recoil";
import { TYPE } from "./constant";

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

export const openWindowSelector = selector({
  key: "openWindowSelector",
  get: ({ get }) => {
    const windows = get(windowsState); // Get the current windows state if needed
    return windows; // You can also return a value here if necessary
  },
  set: ({ get, set }, newWindow) => {
    let hasWindow = false;
    const prevWindows = get(windowsState);

    const originWindows = prevWindows.map((window) => {
      const isSameType = window.type === newWindow.type; //isSameType은 같은 타입인지 확인 + 중복이 가능한지
      const duclicable =
        newWindow.type === TYPE.NEWCARD ||
        newWindow.type === TYPE.NEWNAME ||
        newWindow.type === TYPE.SAVEDCARD;

      if (isSameType && !duclicable) hasWindow = true;
      return {
        ...window,
        isActive: isSameType,
      };
    });
    if (!hasWindow)
      set(windowsState, [...originWindows, newWindow]); // Update the state
    else set(windowsState, [...originWindows]);
  },
});

export const closeWindowSelector = selector({
  key: "closeWindowSelector",
  get: ({ get }) => {
    const windows = get(windowsState); // Get the current windows state if needed
    return windows; // You can also return a value here if necessary
  },
  set: ({ get, set }, id) => {
    const windows = get(windowsState);
    set(
      windowsState,
      windows.filter((w) => w.id !== id)
    );
  },
});
