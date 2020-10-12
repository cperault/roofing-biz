/*************************************************************************************************************
 *File:         Construction.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component will be displayed when the website is under construction, as defind in the .env
 *************************************************************************************************************/

import React from "react";
import ConstructionSign from "../../../media/construction-sign.jpeg";
import "./construction.css";

const Construction = () => {
  return (
    <div className="construction-page-container">
      <h1>Thank you for visiting!</h1>
      <p>This website is currently under construction.</p>
      <img
        src={ConstructionSign}
        alt="Sign indicating that the website is under construction"
      />
    </div>
  );
};

export default Construction;
