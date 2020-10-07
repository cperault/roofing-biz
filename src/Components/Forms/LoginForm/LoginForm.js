import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const LoginForm = ({ userIsLoggedIn, stateHandler }) => {
    let [loginEmail, setLoginEmail] = useState("");
    let [loginPassword, setLoginPassword] = useState("");
    //store errors from submission of form
    const [errors, setErrors] = useState([]);
    //form field errors to be associated with TextField components and their `helperText` content if an error exists
    const [emailAddressErrror, setEmailAddressError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    //useState hook to manage the "page loading effect"
    const [pageLoading, setPageLoading] = useState(false);
    //array to holder user information after logging in
    let user = [];
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
    //authentication handler function
    const authenticate = (email, password) => {
        //page-loading effect should display while request is in progress
        setPageLoading(true);

        axios
            .post(process.env.REACT_APP_ENDPOINT + "/authenticate", {
                email: email,
                password: password
            })
            .then(response => {
                if (response.data.verification === "Failed") {
                    //reset field helperTexts for errors
                    setEmailAddressError("");
                    setPasswordError("");
                    let error = JSON.stringify(response.data.reasoning);
                    console.log(error);
                    setErrors(JSON.parse(error));
                } else if (response.data.verification === "Inactive") {
                    window.location.assign("/confirm_registration");
                } else if (response.data.verification === "Password does not match.") {
                    alert("Incorrect credentials, please try again.");
                    window.location.reload();
                } else if (response.data.verification === "Password verified.") {
                    const user_data = JSON.stringify(response.data.user);
                    const user_object = JSON.parse(user_data);
                    /*
                  User Object from back end will return as:
                  user_object[index].value
                      [0] for .userID
                      [1] for .firstName
                      [2] for .lastName
                      [3] for .phoneNumber
                      [4] for .emailAddress
                      [5] for .userRole
                      [6] for .userAddress (array) => [addressName, addressCity, addressState, addressZip]
                  */

                    user = [
                        {
                            userID: user_object[0].userID,
                            firstName: user_object[1].firstName,
                            lastName: user_object[2].lastName,
                            phoneNumber: user_object[3].phoneNumber,
                            emailAddress: user_object[4].emailAddress,
                            userRole: user_object[5].userRole,
                            userAddress: user_object[6]
                        }
                    ];
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("user", JSON.stringify(user));
                    stateHandler();
                    window.location.assign("/profile");
                }
                setPageLoading(false);
            })
            .catch(error => {
                setPageLoading(false);

                if (String(error) === "Error: Network Error") {
                    alert(
                        "Uh oh, looks like there was an issue talking to the server. Please contact us or try back in a few minutes."
                    );
                } else {
                    console.log(error);
                }
            });
        //end of authenticate method
    };

    useEffect(() => {
        for (const [, value] of Object.entries(errors)) {
            for (const [k, v] of Object.entries(value)) {
                switch (k) {
                    case 'Login Email':
                        setEmailAddressError(v);
                        break;
                    case 'Login Password':
                        setPasswordError(v);
                        break;
                    default:
                }
            }
        }
    }, [errors]);

    return (
        <div className="login-container">
            <div className="login-container-form-div">
                <TextField
                    className={classes.root}
                    variant="outlined"
                    style={inputStyle}
                    value={loginEmail}
                    placeholder="Email address"
                    onChange={text => setLoginEmail(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black"
                        }
                    }}
                    helperText={emailAddressErrror}
                />
                <br />
                <TextField
                    className={classes.root}
                    variant="outlined"
                    style={inputStyle}
                    value={loginPassword}
                    placeholder="Password"
                    onChange={text => setLoginPassword(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black"
                        }
                    }}
                    helperText={passwordError}
                />
                <br />
                <Button
                    onClick={() => authenticate(loginEmail, loginPassword)}
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    size="small"
                >
                    Send
            </Button>
                <p className="loading-message">
                    {pageLoading ? "Checking your credentials..." : ""}
                </p>
            </div>
            <p className="no-account-p-link">
                <a href="/register">No account? Sign up!</a>
                <input type="hidden" name="action" value="signup" />
            </p>
        </div >
    )
}

export default LoginForm;