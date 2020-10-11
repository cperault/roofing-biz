/*************************************************************************************************************
 *File:         App.js
 *Author:       Christopher Perault
 *Project:      roofing-biz
 *Date:         October 10, 2020
 *Description:  This is the main App.js component
 *************************************************************************************************************/

import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SafeLocalStorage from "./SafeLocalStorageHandler.js";
import SiteNav from "./Components/SiteNav/Nav.js";
import Home from "./Components/Pages/HomePage/Home.js";
import Services from "./Components/Pages/ServicesPage/Services.js";
import Contact from "./Components/Pages/ContactPage/Contact.js";
import Login from "./Components/Pages/LoginPage/Login.js";
import Register from "./Components/Pages/RegisterPage/Register.js";
import Profile from "./Components/Pages/ProfilePage/Profile.js";
import AdminProfile from "./Components/Pages/ProfilePage/AdminProfile.js";
import PageNotFound from "./Components/Pages/404/PageNotFound.js";
import ConfirmRegistration from "./Components/Pages/RegisterPage/ConfirmRegistration.js";
import Construction from "./Components/Pages/Construction/Construction.js";

const App = () => {
  //set up the ReactJS useState hook to store logged-in user across website
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(SafeLocalStorage("user", "json"))
  );
  //keep track of if user is logged in
  const userIsLoggedIn = SafeLocalStorage("loggedIn", "false");

  const stateHandler = () => {
    setLoggedInUser([...loggedInUser, SafeLocalStorage("user", "json")]);
  };

  //switch between TRUE and FALSE in .env to show/hide construction
  const pageUnderConstruction = process.env.REACT_APP_PAGE_UNDER_CONSTRUCTION;

  //useState hook to manage state of userRole--will either be admin or customer
  const userRole = loggedInUser[0].userRole;

  return pageUnderConstruction === "TRUE" ? (
    <Construction />
  ) : (
    <div className="page-container">
      <SiteNav userIsLoggedIn={userIsLoggedIn} />
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path={"/services"} component={Services} />
          <Route path={"/contact"} component={Contact} />
          <Route
            path={"/login"}
            render={() => <Login stateHandler={stateHandler} />}
          />
          <Route path={"/register"} component={Register} />
          <Route
            path={"/confirm_registration"}
            component={ConfirmRegistration}
          />
          <Route path={"/logout"} component={Home} />
          <Route
            path={"/profile"}
            render={() =>
              userRole === "customer" ? (
                <Profile
                  userIsLoggedIn={userIsLoggedIn}
                  loggedInUser={loggedInUser}
                />
              ) : (
                <AdminProfile
                  userIsLoggedIn={userIsLoggedIn}
                  loggedInUser={loggedInUser}
                />
              )
            }
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
