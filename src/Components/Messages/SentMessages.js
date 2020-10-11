/*************************************************************************************************************
 *File:         SentMessages.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component returns sent messages
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import MessageTable from "material-table";
import axios from "axios";

const SentMessages = ({ userID }) => {
  //useState hooks to store messages
  const [sentMessages, setSentMessages] = useState([]);

  //useState hook to handle status of the loading text on message fetch
  const [loadingInbox, setLoadingInbox] = useState("Fetching messages...");

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
    },
  ];

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
    <div className="message-inbox-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {sentMessages.length > 0 ? (
        <MessageTable title="Outbox" data={sentMessages} columns={columns} />
      ) : (
        loadingInbox
      )}
    </div>
  );
};

export default SentMessages;
