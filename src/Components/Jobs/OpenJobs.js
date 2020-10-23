/*************************************************************************************************************
 *File:         OpenJobs.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component will display all open jobs
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import OpenJobsTable from "material-table";
import axios from "axios";
import moment from "moment";

const OpenJobs = ({ loggedInUser }) => {
  //useState hook to store array of open jobs
  const [openJobs, setOpenJobs] = useState([]);

  //useState hook to handle status of open jobs fetched (show "Fetching..." and then clear or inform none found
  const [fetchingJobsMessage, setFetchingJobsMessage] = useState(
    "Fetching open jobs..."
  );
  //material-table configuration
  const columns = [
    { field: "jobID", title: "Job ID", hidden: true },
    {
      field: "jobTitle",
      title: "Job Type",
      sorting: true,
      searchable: true,
    },
    {
      field: "jobDateSubmitted",
      title: "Opened",
      sorting: true,
      searchable: true,
      type: "datetime",
      render: (rowData) =>
        rowData.jobDateSubmitted !== null
          ? moment(rowData.jobDateSubmitted).utc().format("MM/DD/YY")
          : "",
    },
    {
      field: "jobDateCompleted",
      title: "Closed",
      sorting: true,
      searchable: true,
      type: "datetime",
      render: (rowData) =>
        rowData.jobDateCompleted !== null
          ? moment(rowData.jobDateCompleted).utc().format("MM/DD/YY")
          : "",
    },
    {
      field: "jobDescription",
      title: "Job Details",
      sorting: true,
      searchable: true,
    },
  ];

  //get open jobs from DB and store in array

  useEffect(() => {
    const userID = loggedInUser[0].userID;
    const loadOpenJobs = () => {
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_open_jobs", {
          userID: userID,
        })
        .then((response) => {
          setOpenJobs(response.data.open_jobs);
          if (openJobs.length > 0) {
            setFetchingJobsMessage("");
          } else {
            setFetchingJobsMessage(
              "You don't currently have any open jobs requested"
            );
          }
        });
    };
    loadOpenJobs();
  }, [loggedInUser, openJobs.length]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {openJobs.length > 0 ? (
        <OpenJobsTable title="Open Jobs" data={openJobs} columns={columns} />
      ) : (
        fetchingJobsMessage
      )}
    </div>
  );
};

export default OpenJobs;
