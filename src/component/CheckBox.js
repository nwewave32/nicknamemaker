import React from "react";
import { colorStyle } from "lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";
import { CustomImg } from "./CustomImg";

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
                <CustomImg
                  imgSrc="images/icons/checked.png"
                  width={24}
                  marginRight={5}
                />
              ) : (
                <CustomImg
                  imgSrc="images/icons/unchecked.png"
                  width={24}
                  marginRight={5}
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
