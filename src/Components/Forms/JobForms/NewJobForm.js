/*************************************************************************************************************
 *File:         NewJobForm.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This is the new job request form component
 *************************************************************************************************************/

import React, { useState, useEffect } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./new-job-form.css";
import { makeStyles } from "@material-ui/core/styles";

const NewJobForm = ({ userAddress = [], userName, userID, newJobDate }) => {
  //useState hooks to store state of the form button and its appearance
  const [buttonText, setButtonText] = useState("Submit");
  const [buttonIcon, setButtonIcon] = useState(<SaveIcon />);

  //useState hook to store an array of errors
  const [errors, setErrors] = useState([]);

  //initial object value of job type checkboxes; pre-checked as Roofing job type
  const jobTypes = [
    { id: 1, name: "Roofing", checked: true },
    { id: 2, name: "Gutters", checked: false },
    { id: 3, name: "Siding", checked: false },
  ];
  //useState hooks to store form values
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState(jobTypes);
  const [jobAddress, setJobAddress] = useState("");
  const [jobAddressID, setJobAddressID] = useState();

  //useState hooks to store new job request form errors
  const [jobDescriptionError, setJobDescriptionError] = useState("");
  const [jobTypeError, setJobTypeError] = useState("");
  const [jobAddressError, setJobAddressError] = useState("");
  //form submission handler
  const submitNewJobRequest = (description, jobType, addressSelected) => {
    //get which job or jobs were selected
    const checked = jobType.filter((type) => type.checked); //returns object

    //array to store job or jobs selected
    const jobTypeArray = [];

    //iterate through the job type selection
    for (const c of checked) {
      jobTypeArray.push(c["name"]);
    }

    //send axios request to the backend to save new job request
    axios
      .post(process.env.REACT_APP_ENDPOINT + "/save_job", {
        userID: userID,
        jobDescription: description,
        jobDateSubmitted: newJobDate,
        jobType: jobTypeArray,
        addressSelected: addressSelected,
        addressID: jobAddressID,
      })
      .then((response) => {
        if (response.data.validation === "Failed") {
          //something wrong with form data
          setJobDescriptionError("");
          setJobAddressError("");
          setJobTypeError("");
          const formError = JSON.stringify(response.data.reasoning);
          //hydrate the errors
          setErrors(JSON.parse(formError));
        } else {
          //form submission was a success, so clear the form
          setJobAddress("");
          setErrors([]);
          setJobDescription("");
          setJobType(jobTypes);

          //update the form button to say it was submitted
          setButtonText("Submitted");
          //update the form button icon
          setButtonIcon(<Check />);
        }
      });
  };

  //checkbox event handler
  const handleChecked = () => {
    setJobType([...jobType]);
  };

  //select menu handler
  const handleSelected = (event) => {
    //store the job address selected in useState hook
    setJobAddress(event.target.value);

    //get index of event target
    const selectedIndex = event.target.options.selectedIndex;

    //get value of the data-key attribute for jobAddressID and store in useState hook
    const addressID = event.target.options[selectedIndex].getAttribute(
      "data-key"
    );

    //update the jobAddressID useState hook
    setJobAddressID(addressID);
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

  useEffect(() => {
    for (const [, value] of Object.entries(errors)) {
      for (const [k, v] of Object.entries(value)) {
        switch (k) {
          case "Job Description":
            setJobDescriptionError(v);
            break;
          case "Job Address":
            setJobAddressError(v);
            break;
          case "checkbox":
            setJobTypeError(v);
            break;
          default:
        }
      }
    }
  }, [errors]);
  return (
    <div className="new-job-form">
      <h2>Requesting New Job</h2>
      <InputLabel htmlFor="user-name">Name on Request</InputLabel>
      <TextField
        variant="outlined"
        value={userName}
        readOnly
        fullWidth
        className={classes.root}
        style={inputStyle}
        InputProps={{
          style: {
            color: "black",
          },
        }}
        inputProps={{
          id: "user-name",
        }}
      />
      <br />
      <br />
      <InputLabel htmlFor="new-job-date">Date of Request</InputLabel>
      <TextField
        className={classes.root}
        value={newJobDate}
        fullWidth
        InputProps={{
          style: {
            color: "black",
          },
        }}
        inputProps={{
          id: "new-job-date",
        }}
      />
      <br />
      <br />
      <InputLabel htmlFor="new-job-description">Description</InputLabel>
      <TextField
        className={classes.root}
        multiline
        rows="4"
        rowsMax="10"
        margin="normal"
        variant="outlined"
        placeholder="What can we do?"
        fullWidth
        value={jobDescription}
        onChange={(text) => setJobDescription(text.target.value)}
        InputProps={{
          style: {
            color: "black",
          },
        }}
        inputProps={{
          id: "new-job-description",
        }}
        helperText={jobDescriptionError}
      />

      <FormControl fullWidth>
        <InputLabel htmlFor="age-native-simple" style={{ color: "black" }}>
          Address of Job
        </InputLabel>
        <Select
          className={classes.select}
          native
          value={jobAddress}
          key={jobAddressID}
          onChange={handleSelected}
          inputProps={{
            id: "age-native-simple",
          }}
        >
          <option value=""></option>
          {userAddress.map((address) => {
            return (
              <option
                key={address["userAddress"].addressID}
                data-key={address["userAddress"].addressID}
                value={address["userAddress"].addressName}
              >
                {address["userAddress"].addressName}
              </option>
            );
          })}
        </Select>
        {jobAddressError && <FormHelperText>{jobAddressError}</FormHelperText>}
      </FormControl>

      <FormGroup>
        <br />
        <br />
        <FormLabel component="legend">
          Which type(s) of jobs are you requesting?
        </FormLabel>
        <br />
        {jobType.map((type) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.root}
                  checked={type.checked}
                  onChange={handleChecked}
                  onClick={() => (type.checked = !type.checked)}
                  value={type.name}
                  key={type.id}
                  style={{
                    color: "black",
                  }}
                />
              }
              label={type.name}
              key={type.id}
            />
          );
        })}
      </FormGroup>
      {jobTypeError && <FormHelperText>{jobTypeError}</FormHelperText>}
      <Button
        variant="contained"
        size="small"
        fullWidth
        style={{ backgroundColor: "black", color: "white" }}
        startIcon={buttonIcon}
        onClick={() => submitNewJobRequest(jobDescription, jobType, jobAddress)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default NewJobForm;
