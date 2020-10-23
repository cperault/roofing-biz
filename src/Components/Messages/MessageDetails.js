/*************************************************************************************************************
 *File:         MessageDetails.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 18, 2020
 *Description:  This component is used to view messages in full detail
 *************************************************************************************************************/

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const MessageDetails = ({ data, showMessageForm, messageType }) => {
  //delete message handler
  const deleteMessageHandler = (messageID) => {
    //confirm with user that they wish to delete the message
    const confirmDelete = window.confirm(
      "Are you sure that you'd like to delete this message? It can't be undone."
    );
    if (confirmDelete) {
      //handle deletion of message by ID
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/delete_message", {
          messageID: messageID,
        })
        .then((response) => {
          alert(response.data.message_deletion_success);
          window.location.reload();
        });
    }
  };

  //message reply handler
  const replyMessageHandler = (message) => {
    showMessageForm("reply");
  };

  const inputStyle = {
    marginBottom: "10px",
    borderRadius: "15px",
    zIndex: "0",
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
  });
  const classes = StyledTextField();

  return (
    <Card>
      <CardContent>
        <TextField
          className={classes.root}
          style={inputStyle}
          label="From"
          readOnly
          variant="outlined"
          fullWidth
          value={data.senderNameFull}
        />
        <TextField
          className={classes.root}
          style={inputStyle}
          label={messageType === "received" ? "Received" : "Sent"}
          readOnly
          variant="outlined"
          fullWidth
          value={moment(data.messageTimeStamp).utc().format("MM/DD/YY hh:mm A")}
        />
        <TextField
          className={classes.root}
          style={inputStyle}
          label="Subject"
          readOnly
          variant="outlined"
          fullWidth
          value={data.messageSubject}
        />
        <TextField
          className={classes.root}
          style={inputStyle}
          label="Message"
          readOnly
          variant="outlined"
          multiline
          fullWidth
          value={data.messageContent}
        />
      </CardContent>
      <CardActions style={{ float: "right", marginRight: "10px" }}>
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() => deleteMessageHandler(data.messageID)}
        >
          Delete
        </Button>
        {messageType === "received" ? (
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => replyMessageHandler(data)}
          >
            Reply
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

export default MessageDetails;
