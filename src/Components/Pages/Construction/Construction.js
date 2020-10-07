import React from 'react';
import ConstructionSign from '../../../media/construction-sign.jpeg';
import './construction.css';

const Construction = () => {
    return (
        <div className="construction-page-container">
            <h1>Thank you for visiting!</h1>
            <p>This website is currently under construction.</p>
            <img src={ConstructionSign} alt="Sign indicating that the website is under construction" />
        </div>
    )
}

export default Construction;