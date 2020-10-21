/*************************************************************************************************************
 *File:         ReceivedMessages.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component returns sent messages
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import MessageTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import MessageDetails from "./MessageDetails.js";

const ReceivedMessages = ({
  userID,
  showMessageForm,
  setCurrentMessage,
  createMessagePreview,
}) => {
  //useState hooks to store messages
  const [receivedMessages, setReceivedMessages] = useState([]);

  //useState hook to handle status of the loading text on message fetch
  const [loadingInbox, setLoadingInbox] = useState("Fetching messages...");

  //useState hook to store the message that was clicked for more details
  const [clickedMessage, setClickedMessage] = useState({});

  //material-table configuration
  const columns = [
    { field: "messageID", title: "Message ID", hidden: true },
    {
      field: "senderNameFull",
      title: "From",
      sorting: true,
      searchable: true,
      render: (rowData) =>
        (rowData.senderNameFull =
          rowData.senderFirstName + " " + rowData.senderLastName),
    },
    {
      field: "messageTimeStamp",
      title: "Date",
      sorting: true,
      searchable: true,
      render: (rowData) =>
        rowData.messageTimeStamp !== null
          ? moment(rowData.messageTimeStamp)
              .utc()
              .format("MM/DD/YYYY [at] hh:mma")
          : "",
    },
    {
      field: "messageSubject",
      title: "Subject",
      sorting: true,
      searchable: true,
    },
    {
      field: "messageContent",
      title: "Message",
      sorting: true,
      searchable: true,
      render: (rowData) => createMessagePreview(rowData.messageContent),
    },
  ];

  //useState hook to manage modal window state
  const [openModal, setOpenModal] = useState(false);

  //modal handler
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  //message click handler
  const handleMessageClick = (_, rowData) => {
    //update `currentMessage` hook
    setCurrentMessage(rowData);
    //update 'clickedMessage` hook
    setClickedMessage(rowData);

    handleModal();
  };

  //on page load, fetch received messages
  useEffect(() => {
    //fetching received messages handler
    const getReceivedMessages = () => {
      //get received messages sent to user from the DB and store in array
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_received_messages", {
          userID: userID,
        })
        .then((response) => {
          setReceivedMessages(response.data.all_messages);
          if (receivedMessages.length > 0) {
            setLoadingInbox("");
          } else {
            setLoadingInbox("You haven't received any messages yet");
          }
        });
    };
    getReceivedMessages();
  }, [userID, receivedMessages.length]);

  return (
    <React.Fragment>
      <div className="message-inbox-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {receivedMessages.length > 0 ? (
          <MessageTable
            title="Inbox"
            data={receivedMessages}
            columns={columns}
            onRowClick={(_, rowData) => handleMessageClick(_, rowData)}
          />
        ) : (
          loadingInbox
        )}
      </div>
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
            <MessageDetails
              data={clickedMessage}
              showMessageForm={showMessageForm}
              messageType={"received"}
            />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ReceivedMessages;