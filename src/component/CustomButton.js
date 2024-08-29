import React from "react";
import { BorderBox } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const StyledBox = styled(BorderBox).attrs({
  justify: "center",
})`
  border-width: 1px;
  padding: ${(props) => (props.highlight ? "2px 4px" : "3px 5px")};
  width: 100%;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const HighLightBox = styled.div`
  border: ${(props) =>
    props.disabled
      ? `1px dotted ${colorStyle.darkGray}`
      : `1px dotted ${colorStyle.black}`};
  width: 100%;
`;
export const CustomButton = ({
  text,
  pressCallback,
  disabled,
  highlight,
  ...rest
}) => {
  return (
    <StyledBox
      onClick={pressCallback}
      disabled={disabled}
      highlight={highlight === undefined ? false : highlight}
      style={{ ...rest.style }}
    >
      {highlight ? (
        <HighLightBox disabled={disabled}>
          <CustomText
            color={disabled ? colorStyle.darkGray : colorStyle.black}
            fontSize={10}
          >
            {text}
          </CustomText>
        </HighLightBox>
      ) : (
        <CustomText
          color={disabled ? colorStyle.darkGray : colorStyle.black}
          fontSize={10}
        >
          {text}
        </CustomText>
      )}
    </StyledBox>
  );
};
