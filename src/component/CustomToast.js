import React, { useEffect } from "react";
import Modal from "react-modal";
import "lib/data/css/toast.css";
import { colorStyle } from "lib/data/styleData";

import { FlexBox } from "./FlexBox";
import styled, { keyframes, css } from "styled-components";

import { CopyWindow } from "./CopyWindow";

const CenteredView = styled(FlexBox).attrs({
  justify: "center",
  align: "center",
})`
  flex: 1;
  margin-top: 22px;
`;

const ModalView = styled(FlexBox)`
  max-width: 400px;
  border-style: solid;
  border-width: 1px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};

  background-color: ${colorStyle.backgroundColor};
`;

Modal.setAppElement("#root");

export const CustomToast = ({ toastVisible, setToastVisible, msg }) => {
  useEffect(() => {
    setTimeout(() => setToastVisible(false), 2000);
  }, []);
  return (
    <Modal
      isOpen={toastVisible}
      onRequestClose={() => {
        setToastVisible((prev) => !prev);
      }}
      closeTimeoutMS={2000}
      preventScroll={true}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <CenteredView>
        <ModalView direction="column">
          <CopyWindow
            title="Alert!"
            msg={msg}
            icon="images/icons/chat.png"
            isModal={true}
            isActive={true}
            setWindowDelete={setToastVisible}
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};
