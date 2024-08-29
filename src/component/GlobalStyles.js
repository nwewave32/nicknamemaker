import styled from "styled-components";
import { FlexBox } from "./FlexBox";
import { colorStyle } from "lib/data/styleData";

export const BorderBox = styled(FlexBox)`
  background: ${colorStyle.backgroundColor};
  border-style: solid;
  border-width: 2px;
  border-color: ${colorStyle.white} ${colorStyle.darkGray}
    ${colorStyle.darkGray} ${colorStyle.white};
  padding: 1px;
`;

export const BorderLine = styled(BorderBox).attrs({})`
  width: 99%;
  border-width: 1px;
  padding: 0;
`;

export const HeaderBtn = styled(FlexBox)`
  min-width: 20px;
  background-color: ${colorStyle.backgroundColor};
  border-style: solid;
  border-width: 1px;
  border-color: ${colorStyle.white} ${colorStyle.darkGray}
    ${colorStyle.darkGray} ${colorStyle.white};
`;

export const FullContainer = styled(FlexBox)`
  width: 100%;
`;

export const InputContainer = styled(FlexBox).attrs({
  justify: "space-between",
  align: "center",
})`
  width: 100%;
  margin-bottom: 10px;
`;

export const TitleContainer = styled(FlexBox)`
  flex: 3;
  padding-top: 3px;
`;

export const ContentContainer = styled(FlexBox)`
  flex: 7;
`;
