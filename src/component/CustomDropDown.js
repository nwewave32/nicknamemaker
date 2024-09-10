import React, { useState, useRef, useLayoutEffect, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "lib/data/calendar.css";

import styled from "styled-components";
import {
  FlexBox,
  CustomImg,
  StyledFormContainer,
  BorderBox,
  CustomText,
} from "component";
import { colorStyle } from "lib/data/styleData";

const StyledDropDown = styled(BorderBox)`
  font-family: Galmuri14;
  border-color: ${colorStyle.black} ${colorStyle.white} ${colorStyle.white}
    ${colorStyle.black};
  background-color: ${colorStyle.white};
  padding: 2px 5px;
  outline: none;
  width: 100%;
  min-height: 14px;
  caret-color: ${colorStyle.darkGray};
  font-size: 12px;
  position: relative;
`;

const DropDownBtn = styled(BorderBox)`
  position: absolute;
  right: 0;
  width: 18px;
  height: 18px;
  border-color: ${colorStyle.black} ${colorStyle.black} ${colorStyle.white}
    ${colorStyle.white};
  transform: rotate(90deg);
  box-sizing: border-box;
  background-color: ${colorStyle.backgroundColor};
  cursor: pointer;
`;

const OptionsContainer = styled(FlexBox)`
  position: absolute;
  top: ${(props) => `${props.height}px`};
  background: ${colorStyle.white};
  width: 100%;

  border: 2px solid #000;
  box-sizing: border-box;
  z-index: 15;
`;

const OptionContainer = styled(FlexBox)`
  width: 100%;
  padding: 2px 2px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.selected ? colorStyle.headerColor : colorStyle.white};
  color: ${(props) => (props.selected ? colorStyle.white : colorStyle.black)};
`;

export const CustomDropDown = ({
  title,
  value,
  changeCallback,
  options,
  isRequired,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const computedHeight = window.getComputedStyle(dropdownRef.current).height;
    const height = Number(computedHeight.replace("px", ""));
    setHeight(height + 8); //8은 padding 2+2, border 2+2

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target)
      ) {
        setShowOptions(false); // 드롭다운 이외의 영역을 클릭했을 때 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledFormContainer title={title} isRequired={isRequired}>
      <StyledDropDown ref={dropdownRef}>
        <CustomText
          fontSize={11}
          textAlign="start"
          style={{ width: "100%", minHeight: "10px" }}
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {value}
        </CustomText>
        <DropDownBtn
          align="center"
          justify="center"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <CustomImg
            imgSrc="images/icons/filled_arrow.png"
            width={10}
            style={{ cursor: "pointer" }}
          />
        </DropDownBtn>
      </StyledDropDown>
      {showOptions && (
        <OptionsContainer direction="column" ref={optionsRef} height={height}>
          {options.map((item) => (
            <OptionContainer
              key={item}
              selected={value === item}
              onClick={() => {
                changeCallback(item);
                setShowOptions(false);
              }}
            >
              {item}
            </OptionContainer>
          ))}
        </OptionsContainer>
      )}
    </StyledFormContainer>
  );
};
