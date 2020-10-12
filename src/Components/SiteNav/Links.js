import React from "react";
import "./nav.css";

const Links = ({ userIsLoggedIn }) => {
  //links can be managed here for top/side/bottom nav
  const links = [
    { id: 0, href: "/home", title: "Home" },
    { id: 1, href: "/services", title: "Services" },
    {
      id: 2,
      href: "/contact",
      title: userIsLoggedIn === "false" ? "Contact Us" : "",
    },
    {
      id: 3,
      href: "/profile",
      title: userIsLoggedIn === "false" ? "" : "Profile",
    },
    {
      id: 4,
      href: userIsLoggedIn === "false" ? "/login" : "/logout",
      title: userIsLoggedIn === "false" ? "Log In" : "Sign Out",
    },
  ];
  const navRedirectHandler = (link) => {
    if (link === "/logout") {
      localStorage.clear();
      window.location.assign("/home");
    } else {
      window.location.assign(link);
    }
  };
  return (
    <ul className="nav-link-ul">
      {links
        .filter((link) => link.title !== "")
        .map((link) => {
          return (
            <li key={link.id}>
              <a href={link.href} onClick={() => navRedirectHandler(link.href)}>
                {link.title}
              </a>
            </li>
          );
        })}
    </ul>
  );
};

export default Links;
