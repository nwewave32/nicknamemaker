import React, { useState, useEffect, useRef } from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { HeaderBtn, BorderBox } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { CopyWindow } from "./CopyWindow";

const WindowContainer = styled.div`
  position: absolute;
  width: 100%;

  padding: 10px;
  visibility: ${(props) => props.visible};
`;

//real window with function
export const Window = ({ window, toggleVisibility, closeWindow, ...rest }) => {
  const windowRef = useRef(null);
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
  const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

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
    console.log("originPosTemp", originPosTemp);
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

  return (
    <WindowContainer
      visible={window.visible ? "visible" : "hidden"}
      ref={windowRef}
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      style={{ left: pos.left, top: pos.top }}
    >
      <CopyWindow
        id={window.id}
        msg={window.msg}
        title={window.title}
        icon={window.icon}
        setWindowVisible={toggleVisibility}
        setWindowDelete={closeWindow}
      />
    </WindowContainer>
  );
};
