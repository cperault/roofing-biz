import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './contact.css';

const ContactForm = () => {
    let [contactFirstName, setContactFirstName] = useState("");
    let [contactLastName, setContactLastName] = useState("");
    let [contactEmail, setContactEmail] = useState("");
    let [contactDescriptionText, setContactDescriptionText] = useState("");
    //store errors received from backend on form submission
    const [errors, setErrors] = useState([]);
    //form field errors to be associated with TextField components and their `helperText` content if an error exists
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [messageBodyError, setMessageBodyError] = useState("");

    const inputStyle = {
        marginBottom: "10px",
        borderRadius: "15px",
        zIndex: "0",
        width: "75%"
    };

    const StyledTextField = makeStyles({
        root: {
            '& label.Mui-focused': {
                color: 'black',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'black',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'black',
                },
            },
        },
    });

    const classes = StyledTextField();

    //contact form submission handler to validate data against the backend
    const processContactForm = () => {
        let formData = [];

        formData = [
            contactFirstName,
            contactLastName,
            contactEmail,
            contactDescriptionText
        ];

        //the contact form is valid; submit the backend request
        axios
            .post(process.env.REACT_APP_ENDPOINT + "/contact", {
                contactFirstName: formData[0],
                contactLastName: formData[1],
                contactEmail: formData[2],
                contactDescriptionText: formData[3]
            })
            .then(response => {
                if (response.data.validation_response === "Rejected") {
                    //reset field helperTexts for errors
                    setFirstNameError("");
                    setLastNameError("");
                    setEmailAddressError("");
                    setMessageBodyError("");
                    //get the errors returned from the backend
                    let error = JSON.stringify(response.data.rejection_reason);
                    console.log(error);
                    //hydrate `setErrors` hook which will then trigger the `useEffect` hook to apply those errors to `helperText` accordingly
                    setErrors(JSON.parse(error));

                }
                else {
                    alert(
                        "Your message was sent. We will contact you as soon as possible."
                    );
                    //refresh page after the alert
                    window.location.reload();
                }
            })
    };

    useEffect(() => {
        for (const [, value] of Object.entries(errors)) {
            for (const [k, v] of Object.entries(value)) {
                switch (k) {
                    case 'First Name':
                        setFirstNameError(v);
                        break;
                    case 'Last Name':
                        setLastNameError(v);
                        break;
                    case 'Email Address':
                        setEmailAddressError(v);
                        break;
                    case 'Message Body':
                        setMessageBodyError(v);
                        break;
                    default:
                }
            }
        }
    }, [errors]);

    return (
        <div className="contact-container-form-div">
            <TextField
                id="first-name-input"
                className={classes.root}
                variant="outlined"
                style={inputStyle}
                placeholder="First name"
                value={contactFirstName}
                onChange={text => setContactFirstName(text.target.value)}
                InputProps={{
                    style: {
                        color: "black"
                    }
                }}
                helperText={firstNameError}
            />
            <br />
            <TextField
                className={classes.root}
                variant="outlined"
                style={inputStyle}
                value={contactLastName}
                placeholder="Last name"
                onChange={text => setContactLastName(text.target.value)}
                InputProps={{
                    style: {
                        color: "black"
                    }
                }}
                helperText={lastNameError}
            />
            <br />
            <TextField
                className={classes.root}
                variant="outlined"
                style={inputStyle}
                value={contactEmail}
                placeholder="Email address"
                onChange={text => setContactEmail(text.target.value)}
                InputProps={{
                    style: {
                        color: "black"
                    }
                }}
                helperText={emailAddressError}
            />
            <br />
            <TextField
                className={classes.root}
                variant="outlined"
                style={inputStyle}
                placeholder="Let us know how we can help..."
                value={contactDescriptionText}
                onChange={text => setContactDescriptionText(text.target.value)}
                InputProps={{
                    style: {
                        color: "black"
                    }
                }}
                multiline
                rows="5"
                rowsMax="8"
                helperText={messageBodyError}
            />
            <br />
            <Button
                onClick={processContactForm}
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                size="small"
            >
                Send
            </Button>
        </div>
    )
}

export default ContactForm;