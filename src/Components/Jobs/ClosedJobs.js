/*************************************************************************************************************
 *File:         ClosedJobs.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component will display all closed jobs
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import ClosedJobsTable from "material-table";
import axios from "axios";
import moment from "moment";

const ClosedJobs = ({ loggedInUser }) => {
  //useState hook to store array of closed jobs
  const [closedJobs, setClosedJobs] = useState([]);

  //useState hook to handle status of closed jobs fetched (show "Fetching..." and then clear or inform none found
  const [fetchingJobsMessage, setFetchingJobsMessage] = useState(
    "Fetching closed jobs..."
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

  useEffect(() => {
    const userID = loggedInUser[0].userID;
    //get closed jobs from DB and store in array
    const loadAllClosedJobs = () => {
      axios
        .post(process.env.REACT_APP_ENDPOINT + "/get_completed_jobs", {
          userID: userID,
        })
        .then((response) => {
          setClosedJobs(response.data.completed_jobs);
          if (closedJobs.length > 0) {
            setFetchingJobsMessage("");
          } else {
            setFetchingJobsMessage(
              "It looks like we haven't completed any jobs yet"
            );
          }
        });
    };
    loadAllClosedJobs();
  }, [loggedInUser, closedJobs.length]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {closedJobs.length > 0 ? (
        <ClosedJobsTable
          title="Closed Jobs"
          data={closedJobs}
          columns={columns}
        />
      ) : (
        fetchingJobsMessage
      )}
    </div>
  );
};

export default ClosedJobs;
