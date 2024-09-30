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
import { StyledFormContainer } from "./StyledFormContainer";

const StyledTextInput = styled.input`
  font-family: Galmuri14;
  border-width: 2px;
  border-color: ${colorStyle.darkGray} ${colorStyle.darkGray}
    ${colorStyle.white} ${colorStyle.white};
  background-color: ${colorStyle.white};
  padding: 2px 5px;
  outline: none;
  width: 100%;
  caret-color: ${colorStyle.darkGray};

  font-size: 12px;
`;

const StyledTextArea = styled.textarea`
  font-family: Galmuri14;
  border-width: 2px;
  border-color: ${colorStyle.black} ${colorStyle.black} ${colorStyle.white}
    ${colorStyle.white};
  background-color: ${colorStyle.white};
  padding: 2px 5px;
  outline: none;
  width: 100%;
  caret-color: ${colorStyle.darkGray};
  height: 120px;
  font-size: 12px;
  text-align: start;
  resize: none;
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
  hasError,
  errorMsg,
}) => {
  return (
    <>
      <StyledFormContainer
        title={title}
        isRequired={isRequired}
        align={multiline ? "flex-start" : "center"}
      >
        {!multiline ? (
          <StyledTextInput
            onChange={(e) => changeCallback(e.target.value)}
            value={textValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <StyledTextArea
            onChange={(e) => changeCallback(e.target.value)}
            value={textValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      </StyledFormContainer>

      {hasError && (
        <FlexBox style={{ padding: 5 }}>
          <CustomText color={colorStyle.warningColor}>{errorMsg}</CustomText>
        </FlexBox>
      )}
    </>
  );
};
