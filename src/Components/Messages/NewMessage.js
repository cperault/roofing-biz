/*************************************************************************************************************
 *File:         NewMessage.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component will be used to compose a new message
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import Check from "@material-ui/icons/Check";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const NewMessage = ({ loggedInUser }) => {
  //useState hooks for message form
  const messageSender = loggedInUser[0].userID;
  const [messageRecipientID, setMessageRecipientID] = useState();
  const [messageRecipient, setMessageRecipient] = useState();
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [allAdmins, setAllAdmins] = useState([]);

  //useState hooks for form errors
  const [errors, setErrors] = useState([]);
  const [messageSenderError, setMessageSenderError] = useState("");
  const [messageRecipientError, setMessageRecipientError] = useState("");
  const [messageSubjectError, setMessageSubjectError] = useState("");
  const [messageContentError, setMessageContentError] = useState("");

  //hook to manage button icon; default is the send arrow but then will be updated to checkmark icon on send
  const [buttonIcon, setButtonIcon] = useState(<SendIcon />);
  //hook to manage button text; default will be "Send" but then be update to "Message Sent" on message send
  const [buttonText, setButtonText] = useState("Send");

  const inputStyle = {
    marginBottom: "10px",
    borderRadius: "15px",
    zIndex: "0",
  };

  //message sending handler
  const handleMessageSend = (
    recipientID,
    userID,
    firstName,
    lastName,
    messageSubject,
    messageContent
  ) => {
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/send_new_message", {
        recipientID: recipientID,
        senderID: userID,
        senderFirstName: firstName,
        senderLastName: lastName,
        messageSubject: messageSubject,
        messageContent: messageContent,
      })
      .then((response) => {
        if (response.data.validation_response === "Rejected") {
          setMessageSenderError("");
          setMessageRecipientError("");
          setMessageSubjectError("");
          setMessageContentError("");
          const formError = JSON.stringify(response.data.rejection_reason);
          //hydrate the errors hook
          setErrors(JSON.parse(formError));
        } else {
          setMessageSubjectError("");
          setMessageContent("");
          //update icon and button text
          setButtonIcon(<Check />);
          setButtonText("Message Sent");
        }
      });
  };

  const StyledTextField = makeStyles({
    root: {
      "& label.Mui-focused": {
        color: "black",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "black",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "black",
        },
        "&:hover fieldset": {
          borderColor: "black",
        },
        "&.Mui-focused fieldset": {
          borderColor: "black",
        },
      },
    },
    select: {
      "&:before": {
        borderColor: "black",
      },
      "&:after": {
        borderColor: "black",
      },
    },
  });
  const classes = StyledTextField();

  //event handler for the select menu
  const handleSelect = (event) => {
    setMessageRecipient(event.target.value);
    //get selected index of event target sent
    let selectedIndex = event.target.options.selectedIndex;
    //get recipient ID
    let id = event.target.options[selectedIndex].getAttribute("data-key");
    setMessageRecipientID(id);
  };

  //get all admin users for select menu options
  useEffect(() => {
    const getAllAdmins = () => {
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_message_users")
        .then((response) => {
          setAllAdmins([]);
          setAllAdmins(response.data.all_admins);
        });
    };
    getAllAdmins();
  }, []);

  //update form errors
  useEffect(() => {
    for (const [, value] of Object.entries(errors)) {
      for (const [k, v] of Object.entries(value)) {
        switch (k) {
          case "Message Recipient":
            setMessageRecipientError(v);
            break;
          case "Message Sender":
            setMessageSenderError(v);
            break;
          case "Message Subject":
            setMessageSubjectError(v);
            break;
          case "Message Body":
            setMessageContentError(v);
            break;
          default:
        }
      }
    }
  }, [errors]);

  return (
    <div className="new-message-container">
      <h2>New Message</h2>
      <FormControl
        fullWidth
        style={{ marginTop: "10px", marginBottom: "30px" }}
      >
        <InputLabel htmlFor="admin-recipient" style={{ color: "black" }}>
          Select message recipient
        </InputLabel>
        <Select
          className={classes.select}
          native
          value={messageRecipient}
          key={messageRecipientID}
          onChange={handleSelect}
          inputProps={{
            id: "admin-recipient",
          }}
        >
          <option value=""></option>
          {allAdmins.map((admin) => {
            return (
              <option
                key={admin.userID}
                data-key={admin.userID}
                value={admin.firstName + " " + admin.lastName}
              >
                {admin.firstName + " " + admin.lastName}
              </option>
            );
          })}
        </Select>
        {messageRecipientError && (
          <FormHelperText>{messageRecipientError}</FormHelperText>
        )}
      </FormControl>
      <TextField
        className={classes.root}
        style={inputStyle}
        label="From"
        value={loggedInUser[0].firstName + " " + loggedInUser[0].lastName}
        fullWidth
        readOnly
        helperText={messageSenderError}
      />
      <TextField
        className={classes.root}
        style={inputStyle}
        id="message_subject"
        label="Subject"
        value={messageSubject}
        fullWidth
        onChange={(text) => setMessageSubject(text.target.value)}
        helperText={messageSubjectError}
      />
      <br />
      <TextField
        className={classes.root}
        style={inputStyle}
        id="message_content"
        label="Message"
        multiline
        rows="4"
        rowsMax="10"
        margin="normal"
        variant="outlined"
        fullWidth
        value={messageContent}
        onChange={(text) => setMessageContent(text.target.value)}
        helperText={messageContentError}
      />
      <Button
        fullWidth
        style={{
          backgroundColor: "black",
          color: "white",
          margin: "2px",
        }}
        startIcon={buttonIcon}
        onClick={() =>
          handleMessageSend(
            messageRecipientID,
            messageSender,
            loggedInUser[0].firstName,
            loggedInUser[0].lastName,
            messageSubject,
            messageContent
          )
        }
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default NewMessage;
