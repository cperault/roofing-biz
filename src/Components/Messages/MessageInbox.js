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
import MessageForm from "../Forms/MessageForm/MessageForm.js";

const MessageInbox = ({ loggedInUser, userID }) => {
  //hook to manage which type of message is being view (received or sent)
  const [messageType, setMessageType] = useState("received-messages");

  //hook to manage which type of new message will be opened in modal; new message or reply message
  const [newMessageType, setNewMessageType] = useState("");

  //hook to store current message object reference being viewed
  const [currentMessage, setCurrentMessage] = useState({});

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

  //shorten the inbox/outbox message fields so that the entire message isn't displayed and looking wonky
  const createMessagePreview = (message) => {
    if (message.length >= 25) {
      return message.trim().substring(0, 25) + "...";
    } else {
      return message.trim();
    }
  };
  //useState hook to manage modal window state
  const [openModal, setOpenModal] = useState(false);

  //show message form for new message
  const showMessageForm = (newOrReply) => {
    setNewMessageType(newOrReply);
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
        <ReceivedMessages
          userID={userID}
          showMessageForm={showMessageForm}
          setCurrentMessage={setCurrentMessage}
          createMessagePreview={createMessagePreview}
        />
      ) : (
        <SentMessages
          userID={userID}
          showMessageForm={showMessageForm}
          createMessagePreview={createMessagePreview}
        />
      )}
      <br />
      <Button
        variant="contained"
        size="small"
        onClick={() => showMessageForm("new")}
        style={{ backgroundColor: "black", color: "white" }}
      >
        Compose New Message
      </Button>
      {newMessageType !== "" && (
        <MessageForm
          loggedInUser={loggedInUser}
          messageType={newMessageType}
          openModal={openModal}
          setOpenModal={setOpenModal}
          currentMessage={currentMessage}
        />
      )}
    </div>
  );
};

export default MessageInbox;
