import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfirmRegistration = () => {
    //page loading hook
    const [pageLoading, setPageLoading] = useState(false);
    //hooks for storing the email address and activation token which will be in the activation link emailed to the user
    const [emailAddress, setEmailAddress] = useState("");
    const [activationToken, setActivationToken] = useState("");

    //when this URL is hit, it will trigger the `useEffect` hook to get the values from the URL/activation link
    useEffect(() => {
        //get activation token from the URL
        let code = window.location.search.replace("?code=", "");
        let parts = code.split("?email=");
        let urlActivationToken = parts[0];
        let urlEmail = parts[1];

        if (urlActivationToken !== "" && urlEmail !== "") {
            setPageLoading(true);
            //hydrate the data hooks
            setEmailAddress(urlEmail);
            setActivationToken(urlActivationToken);
            //activate the user account
            axios.post(process.env.REACT_APP_ENDPOINT + "/confirm_registration", {
                registrationCode: activationToken,
                emailAddress: emailAddress
            }).then(response => {
                if (response.data.registration_verification === "Failed") {
                    setActivationToken("");
                    alert(response.data.reasoning);
                } else if (response.data.registration_verification === "Already done") {
                    alert(response.data.reasoning);
                    window.location.assign("/login");
                } else if (response.data.registration_verification === "Passed") {
                    setPageLoading(false);
                    alert("Thank you for confirming your email address! You will now be redirected to the login page.");
                    window.location.assign("/login");
                }
            });
        }


    }, [emailAddress, activationToken]);

    return (
        <div>
            <h1>Email Address Confirmation</h1>
            <h2>{pageLoading ? "Verifying your request..." : ""}</h2>
        </div>
    )
}

export default ConfirmRegistration;