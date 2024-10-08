import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { WindowBox } from "./WindowBox";
import { useSetRecoilState } from "recoil";
import { windowsState, closeWindowSelector } from "lib/data/atom";

const WindowContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["visible"].includes(prop),
})`
  position: absolute;

  visibility: ${(props) => props.visible};
`;

//real window with function
export const Window = ({ window, toggleVisibility, ...rest }) => {
  const closeWindow = useSetRecoilState(closeWindowSelector);
  const windowRef = useRef(null);
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
  const [pos, setPos] = useState({ left: "40%", top: "20%" }); // 실제 drag할 요소가 위치하는 포지션값

  const dragStartHandler = (e) => {
    const blankCanvas = document.createElement("canvas");
    blankCanvas.style.width = "1px";
    blankCanvas.classList.add("canvas");
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = "move"; // 크롬의그린 +아이콘 제거
    const originPosTemp = { ...originPos };
    originPosTemp["x"] = e.target.offsetLeft;
    originPosTemp["y"] = e.target.offsetTop;

    setOriginPos(originPosTemp); //드래그 시작할때 드래그 전 위치값을 저장

    const clientPosTemp = { ...clientPos };
    clientPosTemp["x"] = e.clientX;
    clientPosTemp["y"] = e.clientY;
    setClientPos(clientPosTemp);
  };

  const dragHandler = (e) => {
    const PosTemp = { ...pos };
    PosTemp["left"] = e.target.offsetLeft + e.clientX - clientPos.x;
    PosTemp["top"] = e.target.offsetTop + e.clientY - clientPos.y;
    setPos(PosTemp);

    const clientPosTemp = { ...clientPos };
    clientPosTemp["x"] = e.clientX;
    clientPosTemp["y"] = e.clientY;
    setClientPos(clientPosTemp);
  };

  const dragOverHandler = (e) => {
    e.preventDefault(); // 드래그시에 플라잉백하는 고스트이미지를 제거한다
  };

  const dragEndHandler = (e) => {
    // if (!isInsideDragArea(e)) {
    //   const posTemp = { ...pos };
    //   posTemp["left"] = originPos.x;
    //   posTemp["top"] = originPos.y;
    //   setPos(posTemp);
    // }
    // 캔버스 제거
    const canvases = document.getElementsByClassName("canvas");
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    // 캔버스로 인해 발생한 스크롤 방지 어트리뷰트 제거
    document.body.removeAttribute("style");
  };

  const isInsideDragArea = (e) => {
    //드래그 종료 시점에 컨테이너 내에 위치하는지 확인
    return true;
  };

  const setWindows = useSetRecoilState(windowsState);

  useLayoutEffect(() => {
    const handleClickWindow = (event) => {
      if (windowRef.current && windowRef.current.contains(event.target)) {
        setWindows((prev) => {
          let target;
          const originWindows = prev
            .filter((windowItem) => {
              if (windowItem.id.toString() === windowRef.current.id) {
                target = {
                  ...windowItem,
                  isActive: true,
                };
                return false;
              }
              return true;
            })
            .map((windowItem) => ({
              ...windowItem,
              isActive: false,
            }));

          return [...originWindows, target];
        });
      }
    };

    document.addEventListener("mousedown", handleClickWindow);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickWindow);
    };
  }, []);

  return (
    <WindowContainer
      id={window.id}
      visible={window.visible ? "visible" : "hidden"}
      ref={windowRef}
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      style={{
        left: pos.left,
        top: pos.top,
        zIndex: window.isActive ? 20 : 10,
      }}
    >
      <WindowBox
        id={window.id}
        msg={window.msg}
        title={window.title}
        icon={window.icon}
        setWindowVisible={toggleVisibility}
        setWindowDelete={closeWindow}
        isActive={window.isActive}
      />
    </WindowContainer>
  );
};
