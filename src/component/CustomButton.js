import React from "react";
import { BorderBox } from "./GlobalStyles";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { CustomImg } from "./CustomImg";
import { globalUtil } from "lib/util";

const margin = ({ margin }) => {
  let result = "";
  if (!globalUtil.checkIsNull(margin)) {
    const marginArr = Object.keys(margin);
    marginArr.forEach((item) => {
      const value = margin[item];
      const key = `margin-${item}`;
      const resultVal = `${key}: ${value};`;
      result += resultVal;
    });
  }
  return result;
};

const StyledBox = styled(BorderBox).withConfig({
  shouldForwardProp: (prop) => !["highlight", "width"].includes(prop),
})`
  border-width: 1px;
  padding: ${(props) => (props.highlight ? "2px 4px" : "3px 5px")};
  width: ${(props) => props.width || "100%"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  ${margin}
`;

const HighLightBox = styled.div`
  border: ${(props) =>
    props.disabled
      ? `1px dotted ${colorStyle.darkGray}`
      : `1px dotted ${colorStyle.black}`};
  width: 100%;
`;

const ButtonContent = ({ disabled, text }) => {
  if (text.includes("image"))
    return <CustomImg imgSrc={text} width={24} marginRight={5} />;
  else
    return (
      <CustomText
        color={disabled ? colorStyle.darkGray : colorStyle.black}
        fontSize={10}
      >
        {text}
      </CustomText>
    );
};
export const CustomButton = ({
  text,
  pressCallback,
  disabled,
  highlight,
  width,
  margin,
}) => {
  return (
    <StyledBox
      justify="center"
      onClick={pressCallback}
      disabled={disabled}
      width={width}
      margin={margin}
      highlight={highlight === undefined ? false : highlight}
    >
      {highlight ? (
        <HighLightBox disabled={disabled}>
          <ButtonContent disabled={disabled} text={text} />
        </HighLightBox>
      ) : (
        <ButtonContent disabled={disabled} text={text} />
      )}
    </StyledBox>
  );
};
