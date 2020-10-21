/*************************************************************************************************************
 *File:         SentMessages.js
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

const SentMessages = ({
  userID,
  showMessageForm,
  createMessagePreview,
}) => {
  //useState hooks to store messages
  const [sentMessages, setSentMessages] = useState([]);

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
              .format("MM/DD/YYYY  [at] hh:mma")
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
    setClickedMessage(rowData);
    handleModal();
  };

  //on page load, fetch sent messages
  useEffect(() => {
    //fetching sent messages handler
    const getSentMessages = () => {
      //get sent messages sent to user from the DB and store in array
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_sent_messages", {
          userID: userID,
        })
        .then((response) => {
          setSentMessages(response.data.all_messages);
          if (sentMessages.length > 0) {
            setLoadingInbox("");
          } else {
            setLoadingInbox("You haven't sent any messages yet");
          }
        });
    };
    getSentMessages();
  }, [userID, sentMessages.length]);

  return (
    <React.Fragment>
      <div className="message-inbox-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {sentMessages.length > 0 ? (
          <MessageTable
            title="Outbox"
            data={sentMessages}
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
              messageType={"sent"}
            />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default SentMessages;