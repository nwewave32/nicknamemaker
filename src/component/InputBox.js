import React from "react";
import moment from "moment";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";
import {
  InputContainer,
  TitleContainer,
  ContentContainer,
} from "./GlobalStyles";

const StyledTextInput = styled.input`
  font-family: Galmuri14;
  border-width: 2px;
  border-color: ${colorStyle.darkGray} ${colorStyle.darkGray}
    ${colorStyle.white} ${colorStyle.white};
  background-color: ${colorStyle.white};
  padding: 3px 5px;
  outline: none;
  width: 100%;
  caret-color: ${colorStyle.darkGray};
  ${(props) => props.multiline && `height: 150px;`}
`;

export const InputBox = ({
  title,
  textValue,
  changeCallback,
  multiline,
  isRequired,
  onFocus,
  onBlur,
  placeholder,
  autoFocus,
  inputMode,
  hasError,
  errorMsg,
}) => {
  return (
    <>
      <InputContainer>
        {/* <CustomText style={{ flex: 3, paddingTop: 3 }}>{title}</CustomText> */}
        <TitleContainer>
          <CustomText>{title}</CustomText>
          {isRequired && (
            <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
          )}
        </TitleContainer>

        <ContentContainer>
          <StyledTextInput
            onChange={(e) => changeCallback(e.target.value)}
            value={textValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            type={inputMode}
            min="1900-01-01"
            max={moment().format("YYYY-MM-DD")}
          />
        </ContentContainer>
      </InputContainer>
      {hasError && (
        <FlexBox style={{ padding: 5 }}>
          <CustomText color={colorStyle.warningColor}>{errorMsg}</CustomText>
        </FlexBox>
      )}
    </>
  );
};
