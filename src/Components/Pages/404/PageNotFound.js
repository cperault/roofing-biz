/*************************************************************************************************************
 *File:         PageNotFound.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This is the custom 404 page component
 *************************************************************************************************************/

import React from "react";
import "./not-found.css";
import NotFoundImage from "../../../media/not-found-image.jpg";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-image">
        <img
          src={NotFoundImage}
          height="500"
          width="600"
          alt="404 sign next to secure door with a keypad lock"
        />
      </div>
      <div className="page-not-found-header-div">
        <h1>Uh oh...</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
