import React from "react";
import "galmuri/dist/galmuri.css";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";

const fontWeight = ({ fontWeight }) => {
  console.log("##fontWeight", fontWeight);
  return fontWeight ? `font-weight: ${fontWeight};` : `font-weight: normal;`;
};

const fontSize = ({ fontSize }) => {
  return fontSize ? `font-size: ${fontSize}px;` : `font-size: 12px;`;
};

const color = ({ color }) => {
  return color ? `color: ${color};` : `color: ${colorStyle.black};`;
};

const textAlign = ({ textAlign }) => {
  return textAlign ? `text-align: ${textAlign};` : `text-align: center;`;
};

const ellipsizeMode = ({ ellipsizeMode }) => {
  return ellipsizeMode === "tail"
    ? `text-overflow: ellipsis;`
    : `text-overflow: clip;`;
};

const FontDiv = styled.div`
  ${fontWeight}
  ${fontSize}
  ${color}
  ${textAlign}
  ${ellipsizeMode}
`;

export const CustomText = ({
  children,
  fontSize,
  fontWeight,
  color,
  ellipsizeMode,
  textAlign,
}) => {
  return (
    <FontDiv
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
      textAlign={textAlign}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </FontDiv>
  );
};
