import React from 'react';
import ContactForm from '../../../Components/Forms/ContactForm/ContactForm.js';
import PhoneIcon from "../../../media/phone.png";
import FacebookIcon from "../../../media/facebook.png";
import EmailIcon from "../../../media/mail.png";
import "./contact.css";

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>How Can We Help?</h1>
            <ContactForm />
            <div className="contact-container-social-media-div">
                <div>
                    <img className="contact_icon" alt="Call icon" src={PhoneIcon} height="30" width="30" />
                </div>
                <div>
                    <img className="contact_icon" alt="Facebook icon" src={FacebookIcon} height="30" width="30" />
                </div>
                <div>
                    <img className="contact_icon" alt="Email icon" src={EmailIcon} height="30" width="30" />
                </div>
            </div>
        </div>
    )
}

export default Contact;