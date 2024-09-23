import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, CustomButton, WindowBox, CustomImg } from "component";
import { globalUtil } from "lib/util";
import {
  WhiteCard,
  BlackCard,
  GreenCard,
  PinkCard,
  PurpleCard,
} from "component/idCards";

const ButtonContainer = styled(FlexBox)`
  margin-top: 20px;
`;
export const IdCard = ({ info }) => {
  const [cardType, setCardType] = useState(0);

  useLayoutEffect(() => {
    if (globalUtil.checkIsNull(info.vibe)) {
      setCardType("white");
    } else setCardType(info.vibe);
  }, []);

  useEffect(() => {
    console.log("##cardType", cardType);
  }, [cardType]);

  return (
    <>
      {cardType === "white" && <WhiteCard info={info} />}
      {cardType === "black" && <BlackCard info={info} />}
      {cardType === "green" && <GreenCard info={info} />}
      {cardType === "pink" && <PinkCard info={info} />}
      {cardType === "purple" && <PurpleCard info={info} />}
      <ButtonContainer>
        <CustomButton
          margin={{ right: "5px" }}
          text="Share"
          pressCallback={() => {}}
        />

        <CustomButton
          margin={{ right: "5px" }}
          text="Copy"
          pressCallback={() => {}}
        />
        <CustomButton
          margin={{ right: "5px" }}
          text="Retry"
          pressCallback={() => {}}
        />
      </ButtonContainer>
    </>
  );
};
