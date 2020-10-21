/*************************************************************************************************************
 *File:         MessageForm.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This message component will be used for sending a new message or creating a reply message,
                depending on the `messageType` passed into props
 *************************************************************************************************************/

import React from "react";
import { Button, Modal } from "@material-ui/core/";
import NewMessage from "../../Messages/NewMessage.js";

const MessageForm = ({
  loggedInUser,
  messageType,
  openModal,
  setOpenModal,
  currentMessage,
}) => {
  //modal handler
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Modal open={openModal}>
      <div
        className="modal-container"
        style={{
          maxHeight: "100%",
          backgroundColor: "white",
          border: "solid 1px black",
          overflowY: "auto",
        }}
      >
        <div className="modal-container-body" style={{ padding: "10px" }}>
          <Button
            className="modal-container-close"
            variant="contained"
            size="small"
            style={{
              float: "right",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={handleModal}
          >
            <span style={{ fontSize: "14px" }}>&times;</span>
          </Button>
          <br />
          <br />
          {messageType === "reply" ? (
            <NewMessage
              loggedInUser={loggedInUser}
              isReplyMessage={true}
              currentMessage={currentMessage}
            />
          ) : (
            <NewMessage loggedInUser={loggedInUser} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MessageForm;
