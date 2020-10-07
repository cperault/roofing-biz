import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import './register.css';

const RegisterForm = ({
    loggedInUser,
    userIsLoggedIn
}) => {
    //useState hooks to store first/last name, email and password from the form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressName, setAddressName] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressZip, setAddressZip] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //useState hook to manage the "page loading effect"
    const [pageLoading, setPageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    //form field errors to be associated with TextField components and their `helperText` content if an error exists
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [addressNameError, setAddressNameError] = useState("");
    const [addressCityError, setAddressCityError] = useState("");
    const [addressStateError, setAddressStateError] = useState("");
    const [addressZipError, setAddressZipError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const inputStyleOne = {
        marginBottom: "10px",
        width: "50%",
        zIndex: "0"
    };
    const inputStyleTwo = {
        marginBottom: "10px",
        width: "100%",
        zIndex: "0"
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

    //submit email address and password from registration for account to be created
    //note: data will be sanitized server-side but protected by HTTPS client side
    const registerUser = (
        firstName,
        lastName,
        addressName,
        addressCity,
        addressState,
        addressZip,
        phone,
        email,
        password
    ) => {
        //page loading effect should display while the registration request is being processed
        setPageLoading(true);
        //extract first and last inital for avatar
        let firstInitial = firstName.substring(1, 0);
        let lastInitial = lastName.substring(1, 0);
        let userAvatarText = firstInitial + lastInitial;
        //send axios POST request
        axios
            .post(process.env.REACT_APP_ENDPOINT + "/register", {
                firstName: firstName,
                lastName: lastName,
                addressName: addressName,
                addressCity: addressCity,
                addressState: addressState,
                addressZip: addressZip,
                phone: phone,
                email: email,
                password: password,
                userAvatar: userAvatarText
            })
            .then(response => {
                setPageLoading(false);
                if (response.data.status === "result") {
                    alert(JSON.stringify(response.data.details));
                } else if (response.data.verification === "Failed") {
                    //reset field helperTexts for errors
                    setFirstNameError("");
                    setLastNameError("");
                    setAddressNameError("");
                    setAddressCityError("");
                    setAddressStateError("");
                    setAddressZipError("");
                    setPhoneNumberError("");
                    setEmailAddressError("");
                    setPasswordError("");
                    let error = JSON.stringify(response.data.reasoning);
                    setErrors(JSON.parse(error));
                } else if (response.data.email_status === "Failed") {
                    console.log(response.data.reasoning);
                } else {
                    alert(
                        "You're registered! Close this page and then check your email for the activation link."
                    );
                    //take the user to the login page
                    window.location.assign("/login");
                }
            })
            .catch(error => {
                setPageLoading(false);
                if (String(error) === "Error: Network Error") {
                    alert(
                        "Uh oh, looks like there was an issue getting you registered. Please try back in a few minutes."
                    );
                } else {
                    console.log(error);
                }
            });
        //end of registration method
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
                    case 'Address Name':
                        setAddressNameError(v);
                        break;
                    case 'Address City':
                        setAddressCityError(v);
                        break;
                    case 'Address State':
                        setAddressStateError(v);
                        break;
                    case 'Address ZIP':
                        setAddressZipError(v);
                        break;
                    case 'Phone Number':
                        setPhoneNumberError(v);
                        break;
                    case 'Email Address':
                        setEmailAddressError(v);
                        break;
                    case 'Password':
                        setPasswordError(v);
                        break;
                    default:
                }
            }
        }
    }, [errors]);

    return (
        <React.Fragment>
            <div className="register-container-form-div">
                <TextField
                    className={classes.root}
                    placeholder="First name"
                    variant="outlined"
                    style={inputStyleOne}
                    name="signup_first_name"
                    value={firstName}
                    onChange={text => setFirstName(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            marginRight: "5px",
                            fontSize: "14px"
                        }
                    }}
                    helperText={firstNameError}
                />
                <TextField
                    className={classes.root}
                    placeholder="Last name"
                    variant="outlined"
                    style={inputStyleOne}
                    name="signup_last_name"
                    value={lastName}
                    onChange={text => setLastName(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    helperText={lastNameError}
                />
                <br />
                <TextField
                    className={classes.root}
                    placeholder="Address"
                    variant="outlined"
                    style={inputStyleTwo}
                    name="signup_address_name"
                    value={addressName}
                    onChange={text => setAddressName(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    helperText={addressNameError}
                />
                <br />
                <TextField
                    className={classes.root}
                    placeholder="City"
                    variant="outlined"
                    style={{ width: "40%", marginBottom: "10px", zIndex: "0" }}
                    name="signup_address_city"
                    value={addressCity}
                    onChange={text => setAddressCity(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px",
                            marginRight: "5px"
                        }
                    }}
                    helperText={addressCityError}
                />
                <TextField
                    className={classes.root}
                    placeholder="State"
                    variant="outlined"
                    style={{ width: "30%", marginBottom: "10px", zIndex: "0" }}
                    name="signup_address_state"
                    value={addressState}
                    onChange={text => setAddressState(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            marginRight: "5px",
                            fontSize: "14px"
                        }
                    }}
                    inputProps={{ maxLength: 2 }}
                    helperText={addressStateError}
                />
                <TextField
                    className={classes.root}
                    placeholder="Zip code"
                    variant="outlined"
                    style={{ width: "30%", marginBottom: "10px", zIndex: "0" }}
                    name="signup_address_zip"
                    value={addressZip}
                    onChange={text => setAddressZip(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    inputProps={{ maxLength: 5 }}
                    helperText={addressZipError}
                />
                <br />
                <NumberFormat
                    className={classes.root}
                    placeholder="Phone number"
                    customInput={TextField}
                    variant="outlined"
                    value={phone}
                    name="signup_phone"
                    onChange={text => setPhone(text.target.value)}
                    style={inputStyleTwo}
                    format="###-###-####"
                    mask="_"
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    helperText={phoneNumberError}
                />
                <br />
                <TextField
                    className={classes.root}
                    placeholder="Email address"
                    variant="outlined"
                    style={inputStyleTwo}
                    name="signup_email"
                    value={email}
                    onChange={text => setEmail(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    helperText={emailAddressError}
                />
                <br />
                <TextField
                    className={classes.root}
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    style={inputStyleTwo}
                    name="signup_password"
                    value={password}
                    onChange={text => setPassword(text.target.value)}
                    InputProps={{
                        style: {
                            color: "black",
                            fontSize: "14px"
                        }
                    }}
                    helperText={passwordError}
                />
                <br />
                <Button
                    onClick={() =>
                        registerUser(
                            firstName,
                            lastName,
                            addressName,
                            addressCity,
                            addressState,
                            addressZip,
                            phone,
                            email,
                            password
                        )
                    }
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "black", color: "white" }}
                >
                    Register
            </Button>

                <p className="loading-message">
                    {pageLoading ? "Getting you registered..." : ""}
                </p>
            </div>
        </React.Fragment >
    );
};

export default RegisterForm;
