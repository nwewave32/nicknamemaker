import { atom, selector } from "recoil";

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
      const isSameType = window.type === newWindow.type;
      if (isSameType) hasWindow = true;
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
