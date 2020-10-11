/*************************************************************************************************************
 *File:         MessageInbox.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component consists of the view for messages
 *************************************************************************************************************/

import React, { useState } from "react";
import ReceivedMessages from "../Messages/ReceivedMessages.js";
import SentMessages from "../Messages/SentMessages.js";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import NewMessage from "../Messages/NewMessage.js";

const MessageInbox = ({ loggedInUser, userID }) => {
  //hook to manage which type of message is being view (received or sent)
  const [messageType, setMessageType] = useState("received-messages");

  //message type (received or sent) toggle handler
  const toggleMessageType = (element) => {
    setMessageType(element.target.id);
    //get the ID of the clicked message type tab
    const messageTabSelected = document.getElementById(element.target.id);
    //get tabs so that we can apply styling based on which is clicked
    const receivedMessagesTab = document.getElementById("received-messages");
    const sentMessagesTab = document.getElementById("sent-messages");
    //toggle currently loaded data accordingly
    switch (messageTabSelected.id) {
      case "received-messages":
        receivedMessagesTab.style = "text-decoration: underline;";
        sentMessagesTab.style = "text-decoration: none";
        break;
      case "sent-messages":
        sentMessagesTab.style = "text-decoration: underline;";
        receivedMessagesTab.style = "text-decoration: none;";
        break;
      default:
    }
  };

  //useState hook to manage modal window state
  const [openModal, setOpenModal] = useState(false);

  //modal handler
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="message-inbox-container">
      <div className="message-inbox-container-tabs">
        <div className="message-inbox-container-div-received">
          <span
            id="received-messages"
            style={{ textDecoration: "underline" }}
            onClick={(e) => toggleMessageType(e)}
          >
            Received
          </span>
        </div>
        <div className="message-inbox-container-div-sent">
          <span id="sent-messages" onClick={(e) => toggleMessageType(e)}>
            Sent
          </span>
        </div>
      </div>
      {messageType === "received-messages" ? (
        <ReceivedMessages userID={userID} />
      ) : (
        <SentMessages userID={userID} />
      )}
      <br />
      <Button
        variant="contained"
        size="small"
        onClick={handleModal}
        style={{ backgroundColor: "black", color: "white" }}
      >
        Compose New Message
      </Button>
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
            <NewMessage loggedInUser={loggedInUser} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessageInbox;
