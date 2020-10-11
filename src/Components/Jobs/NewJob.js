/*************************************************************************************************************
 *File:         NewJob.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component handles requesting a new job
 *************************************************************************************************************/

import React from "react";
import NewJobForm from "../Forms/JobForms/NewJobForm.js";

const NewJob = ({ loggedInUser }) => {
  //extract the address from the loggedInUser object; will be an array
  const userAddress = loggedInUser[0].userAddress;

  //get user's ID for the request
  const userID = loggedInUser[0].userID;

  //piece together full name from loggedInUser object
  const userName = loggedInUser[0].firstName + " " + loggedInUser[0].lastName;

  //get today's date
  const today = new Date();
  const todayFormatted =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

  return (
    <NewJobForm
      userAddress={userAddress}
      userName={userName}
      userID={userID}
      newJobDate={todayFormatted}
    />
  );
};

export default NewJob;
