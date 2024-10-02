import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "lib/data/css/calendar.css";
import { StyledFormContainer } from "./StyledFormContainer";
import { globalUtil } from "lib/util";

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
        onCalendarOpen={() => {
          const target = document.querySelector(".react-datepicker-popper");
          if (target) {
            target.style.top = "-10px";
            target.style.left = "-23%";
          }
        }}
        onChange={(date, event) => {
          const newDt = moment(date);

          if (!globalUtil.checkIsNull(newDt) && newDt.isValid()) {
            const returnVal = newDt.format("YYYY-MM-DD");

            changeCallback(returnVal);
          }
        }}
        selectsDisabledDaysInRange={true}
        dateFormat={["yyyy-MM-dd", "yyyyMMdd", "yyyy.MM.dd"]}
      />
    </StyledFormContainer>
  );
};
