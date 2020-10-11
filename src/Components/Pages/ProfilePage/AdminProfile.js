/*************************************************************************************************************
 *File:         AdminProfile.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This component consists of the main profile view for logged in admin users
 *************************************************************************************************************/

import React from "react";

const AdminProfile = ({ userIsLoggedIn, loggedInUser }) => {
  return (
    <div className="profile-page-container-admin">
      <p>This is the admin's main dashboard profile</p>
    </div>
  );
};

export default AdminProfile;
