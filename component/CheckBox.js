import React from "react";

import checked from "../public/images/icons/checked.png";
import unchecked from "../public/images/icons/unchecked.png";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const CheckBox = ({ title, items, pressCallBack, isRequired }) => {
  return (
    <FlexBox
      style={{ marginBottom: 10 }}
      justify="space-between"
      align="flex-start"
      direction="column"
    >
      <FlexBox>
        <CustomText>{title}</CustomText>
        {isRequired ? (
          <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
        ) : (
          <></>
        )}
      </FlexBox>
      <FlexBox
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {items.map((item) => {
          return (
            <FlexBox
              onClick={(e) => {
                pressCallBack(e, item.id);
              }}
              key={item.label}
              style={{ marginRight: 5 }}
              align="center"
              justify="center"
            >
              {item.isChecked ? (
                <img
                  src={checked}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: -1,
                    marginRight: 5,
                  }}
                />
              ) : (
                <img
                  src={unchecked}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: -1,
                    marginRight: 5,
                  }}
                />
              )}

              <CustomText>{item.label}</CustomText>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};
