import React from "react";
import moment from "moment";
import styled from "styled-components";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const InputContainer = styled(FlexBox).attrs({
  justify: "space-between",
  align: "flex-start",
})`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledTextInput = styled.input`
  font-family: Galmuri14;
  border-width: 2px;
  border-color: ${colorStyle.darkGray} ${colorStyle.darkGray}
    ${colorStyle.white} ${colorStyle.white};
  background-color: ${colorStyle.white};
  padding-top: 3px 5px;
  outline: none;
  width: 100%;
  caret-color: ${colorStyle.darkGray};
  ${(props) => props.multiline && `height: 150px;`}
`;

const TitleContainer = styled(FlexBox)`
  flex: 3;
  padding-top: 3px;
`;

const ContentContainer = styled(FlexBox)`
  flex: 7;
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
