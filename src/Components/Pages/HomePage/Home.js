/*************************************************************************************************************
 *File:         Home.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 7, 2020
 *Description:  This is the landing page component
 *************************************************************************************************************/

import React from "react";
import "./home.css";

const Home = ({ logout }) => {
  if (logout) {
    localStorage.setItem("loginStatus", "out");
  }
  return <div className="home-container"></div>;
};

export default Home;
