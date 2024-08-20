import React, { useState } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const GridView = ({ title, items, pressCallBack, isRequired }) => {
  const [rowGap, setRowGap] = useState(10);
  const [columnGap, setColumnGap] = useState(10);

  return (
    <>
      <FlexBox
        style={{ width: "100%", marginBottom: 10 }}
        direction="column"
        justify="center"
        align="center"
      >
        <FlexBox style={{ paddingLeft: 20, width: "100%" }}>
          <CustomText>{title}</CustomText>
          {isRequired ? (
            <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
          ) : (
            <></>
          )}
        </FlexBox>

        <PreviewLayout
          columnGap={columnGap}
          handleColumnGapChange={setColumnGap}
          rowGap={rowGap}
          handleRowGapChange={setRowGap}
        >
          {items.map((item) => {
            return (
              <div
                onClick={(e) => {
                  pressCallBack(e, item.id);
                }}
                key={item.label}
              >
                <FlexBox style={{ marginBottom: 10 }}>
                  <FlexBox style={{ width: 5 }}></FlexBox>
                  {item.isChecked ? (
                    <IoIosRadioButtonOn size={24} color="black" />
                  ) : (
                    <IoIosRadioButtonOff size={24} color="black" />
                  )}
                  <FlexBox style={{ width: 3 }}></FlexBox>
                  <FlexBox
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: colorStyle.darkGray,
                      borderRadius: 10,
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                      src={item.img}
                    />
                  </FlexBox>
                </FlexBox>
              </div>
            );
          })}
        </PreviewLayout>
      </FlexBox>
    </>
  );
};

const PreviewLayout = ({
  children,
  handleColumnGapChange,
  handleRowGapChange,
  rowGap,
  columnGap,
}) => (
  <div style={{ flex: 1 }}>
    <div
      style={[
        {
          flex: 1,
          marginTop: 8,
          maxHeight: 600,
          flexWrap: "wrap",
          alignContent: "flex-start",
        },
        { rowGap, columnGap },
      ]}
    >
      {children}
    </div>
  </div>
);

export default GridView;
