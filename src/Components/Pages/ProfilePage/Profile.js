/*************************************************************************************************************
 *File:         Profile.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component consists of the main profile view
 *************************************************************************************************************/

import React, { useState } from "react";
import Jobs from "../../Jobs/Jobs.js";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import MessageInbox from "../../Messages/MessageInbox.js";
import "./profile.css";

const Profile = ({ loggedInUser }) => {
  //customer profile should have the following abilities:
  //ability to request a new job
  //ability to view open jobs
  //ability to view all jobs (open and closed/completed)
  //ability to view account info
  //ability to view/send messages

  //admin profile should ahve the following abilities:
  //ability to create new job for specific customer
  //ability to view all jobs and search/filter/sort (react table) and edit them
  //ability to pull up a customer's account info including all jobs (open, completed, all)
  //ability to view/send messages
  //ability to edit customer account status (update info, delete account, add/update/remove mailing and texting list)

  //useState hook to manage state of which job status (open, closed, all) is being viewed
  const [jobStatusBeingViewed, setJobStatusBeingViewed] = useState(
    "open-jobs-tab"
  );

  //useState hook to manage modal window state
  const [openModal, setOpenModal] = useState(false);

  //modal handler
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  //job table toggle handler
  const toggleJobTable = (element) => {
    //hydrate hook with clicked element to load the associated data
    setJobStatusBeingViewed(element.target.id);
    //get the ID of the clicked job tab
    const jobDataLoaded = document.getElementById(element.target.id);
    //get tabs so that we can apply styling based on which is clicked
    const openJobsData = document.getElementById("open-jobs-tab");
    const closedJobsData = document.getElementById("closed-jobs-tab");
    //toggle currently loaded data accordingly
    switch (jobDataLoaded.id) {
      case "open-jobs-tab":
        openJobsData.style = "text-decoration: underline;";
        closedJobsData.style = "text-decoration: none";
        break;
      case "closed-jobs-tab":
        closedJobsData.style = "text-decoration: underline;";
        openJobsData.style = "text-decoration: none;";
        break;
      default:
    }
  };

  return (
    <div className="profile-page-container-div">
      <div className="profile-page-job-div">
        <h1>Job Dashboard</h1>
        <div className="profile-page-job-div-jobs">
          <div className="profile-page-job-div-jobs-open">
            <span
              id="open-jobs-tab"
              style={{ textDecoration: "underline" }}
              onClick={(e) => toggleJobTable(e)}
            >
              Open Jobs
            </span>
          </div>
          <div className="profile-page-job-div-jobs-closed">
            <span id="closed-jobs-tab" onClick={(e) => toggleJobTable(e)}>
              Closed Jobs
            </span>
          </div>
        </div>
        <Jobs jobType={jobStatusBeingViewed} loggedInUser={loggedInUser} />
        <br />
        <Button
          variant="contained"
          size="small"
          onClick={handleModal}
          style={{ backgroundColor: "black", color: "white" }}
        >
          Request new job
        </Button>
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
              onClick={() => handleModal("close", null)}
            >
              <span style={{ fontSize: "14px" }}>&times;</span>
            </Button>
            <br />
            <br />
            <Jobs jobType={"new"} loggedInUser={loggedInUser} />
          </div>
        </div>
      </Modal>
      <br />
      <hr />
      <h1>Messages</h1>
      <MessageInbox
        loggedInUser={loggedInUser}
        userID={loggedInUser[0].userID}
      />
    </div>
  );
};

export default Profile;
