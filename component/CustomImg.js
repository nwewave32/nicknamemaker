import React from "react";
import "galmuri/dist/galmuri.css";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";

const marginRight = ({ marginRight }) => {
  return marginRight !== undefined
    ? `margin-right: ${marginRight}px;`
    : `margin-right: 0px;`;
};

const marginLeft = ({ marginLeft }) => {
  return marginLeft !== undefined
    ? `margin-left: ${marginLeft}px;`
    : `margin-left: 0px;`;
};

const StyledImg = styled.img`
  ${marginRight}
  ${marginLeft}
`;

export const CustomImg = ({ imgSrc, width, marginRight, marginLeft }) => {
  return (
    <StyledImg
      src={imgSrc}
      width={width}
      marginRight={marginRight}
      marginLeft={marginLeft}
    />
  );
};
