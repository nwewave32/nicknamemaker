import React from "react";
import styled from "styled-components";

const direction = ({ direction }) => {
  return direction ? `flex-direction: ${direction};` : `flex-direction: row;`;
};

const align = ({ align }) => {
  return align ? `align-items: ${align};` : `align-items: center;`;
};
const justify = ({ justify }) => {
  return justify
    ? `justify-content: ${justify};`
    : `justify-content: flex-start;`;
};

const FlexBoxContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["direction"].includes(prop),
})`
  display: flex;
  position: relative;
  boxsizing: border-box;
  ${direction}
  ${align}
  ${justify}
`;

export const FlexBox = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <FlexBoxContainer ref={ref} {...rest}>
      {children}
    </FlexBoxContainer>
  );
});
//FlexBox 먼저 선언하고 적어야 먹힘. 순서 중요!
// flexbox 사용시 direction이 column 이면 justify, align 반대로 사용해야함
FlexBox.defaultProps = {
  direction: "row",
  align: "center",
  justify: "flex-start",
  // center: false,
  // wrap: false,
};

// FlexBox.propTypes = {
//   direction: PropTypes.oneOf(["row", "column"]),
//   align: PropTypes.oneOf([
//     "flex-start",
//     "flex-end",
//     "center",
//     "stretch",
//     "baseline",
//   ]),
//   justify: PropTypes.oneOf([
//     "flex-start",
//     "flex-end",
//     "center",
//     "space-around",
//     "space-between",
//     "space-evenly",
//   ]),
// };
