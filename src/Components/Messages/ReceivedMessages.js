/*************************************************************************************************************
 *File:         ReceivedMessages.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component returns sent messages
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import MessageTable from "material-table";
import axios from "axios";

const ReceivedMessages = ({ userID }) => {
  //useState hooks to store messages
  const [receivedMessages, setReceivedMessages] = useState([]);

  //useState hook to handle status of the loading text on message fetch
  const [loadingInbox, setLoadingInbox] = useState("Fetching messages...");

  //material-table configuration
  const columns = [
    { field: "messageID", title: "Message ID", hidden: true },
    { field: "senderNameFull", title: "From", sorting: true, searchable: true },
    { field: "messageTimeStamp", title: "", sorting: true, searchable: true },
    {
      field: "messageSubject",
      title: "Subject",
      sorting: true,
      searchable: true,
    },
    {
      field: "MessageContent",
      title: "Message",
      sorting: true,
      searchable: true,
    },
  ];

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
    <div className="message-inbox-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {receivedMessages.length > 0 ? (
        <MessageTable title="Inbox" data={receivedMessages} columns={columns} />
      ) : (
        loadingInbox
      )}
    </div>
  );
};

export default ReceivedMessages;
