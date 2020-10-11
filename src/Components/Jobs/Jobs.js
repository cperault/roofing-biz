/*************************************************************************************************************
 *File:         Jobs.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  jobType will be passed in and decide which Jobs componet to display: new, open, closed, or all
 *************************************************************************************************************/

import React from "react";
import NewJob from "./NewJob.js";
import OpenJobs from "./OpenJobs.js";
import ClosedJobs from "./ClosedJobs.js";

const Jobs = ({ jobType, loggedInUser }) => {
  switch (jobType) {
    case "new":
      return <NewJob loggedInUser={loggedInUser} />;
    case "open-jobs-tab":
      return <OpenJobs loggedInUser={loggedInUser} />;
    case "closed-jobs-tab":
      return <ClosedJobs loggedInUser={loggedInUser} />;
    default:
  }
};

export default Jobs;
