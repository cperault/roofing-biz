/*************************************************************************************************************
 *File:         Login.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 7, 2020
 *Description:  This is the login page component which also contains the login form component
 *************************************************************************************************************/

import React from "react";
import LoginForm from "../../../Components/Forms/LoginForm/LoginForm.js";
import "./login.css";

const Login = ({ stateHandler }) => {
  return (
    <div className="login-container">
      <h1>Please Sign In</h1>
      <LoginForm stateHandler={stateHandler} />
    </div>
  );
};

export default Login;
