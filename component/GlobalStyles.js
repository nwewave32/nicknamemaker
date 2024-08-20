import styled from "styled-components";
import { FlexBox } from "./FlexBox";
import { colorStyle } from "../lib/data/styleData";

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
