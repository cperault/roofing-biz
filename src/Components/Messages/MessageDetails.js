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

const MessageDetails = ({ data }) => {
  return (
    <Card>
      <CardContent>
        From
        <TextField
          readOnly
          variant="outlined"
          fullWidth
          value={data.senderNameFull}
        />
        Subject
        <TextField
          readOnly
          variant="outlined"
          fullWidth
          value={data.messageSubject}
        />
        Message
        <TextField
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
        >
          Delete
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          Reply
        </Button>
      </CardActions>
    </Card>
  );
};

export default MessageDetails;
