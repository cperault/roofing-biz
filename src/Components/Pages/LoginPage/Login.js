import React from 'react';
import LoginForm from '../../../Components/Forms/LoginForm/LoginForm.js';
import './login.css';

const Login = ({ stateHandler }) => {
    return (
        <div className="login-container">
            <h1>Please Sign In</h1>
            <LoginForm stateHandler={stateHandler} />
        </div>
    )
}

export default Login;