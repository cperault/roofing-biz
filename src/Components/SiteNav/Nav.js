import React from 'react';
import Links from './Links.js';

const Nav = ({ userIsLoggedIn }) => {
    return (
        <Links userIsLoggedIn={userIsLoggedIn} />
    )
}

export default Nav;