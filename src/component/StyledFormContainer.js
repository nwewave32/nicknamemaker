import React, { useState } from "react";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import "react-datepicker/dist/react-datepicker.css";
import {
  InputContainer,
  ContentContainer,
  TitleContainer,
} from "./GlobalStyles";
import "lib/data/calendar.css";

export const StyledFormContainer = ({ title, isRequired, children, align }) => {
  return (
    <>
      <InputContainer align={align}>
        {/* <CustomText style={{ flex: 3, paddingTop: 3 }}>{title}</CustomText> */}
        <TitleContainer>
          <CustomText>{title}</CustomText>
          {isRequired && (
            <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
          )}
        </TitleContainer>

        <ContentContainer>{children}</ContentContainer>
      </InputContainer>
    </>
  );
};
