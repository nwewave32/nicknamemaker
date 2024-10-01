import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "lib/data/css/calendar.css";
import { StyledFormContainer } from "./StyledFormContainer";

export const CustomDatePicker = ({
  title,
  dateValue,
  changeCallback,
  isRequired,
}) => {
  return (
    <StyledFormContainer title={title} isRequired={isRequired}>
      <DatePicker
        required={true}
        dropdownMode={true}
        toggleCalendarOnIconClick={true}
        selected={dateValue}
        onChange={(date) => {
          const newDt = moment(date);
          if (date !== null && newDt.isValid()) {
            const returnVal = newDt.format("YYYY-MM-DD");
            console.log("##returnVal", returnVal);
            changeCallback(returnVal);
          }
        }}
        minDate="1990-01-01"
        maxDate="2100-12-31"
        dateFormat={["yyyy-MM-dd", "yyyyMMdd", "yyyy.MM.dd"]}
      />
    </StyledFormContainer>
  );
};
