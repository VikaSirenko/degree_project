import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './css/Login.css';
import logo from './images/logo.webp';


function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signIn', {
                email,
                password
            });
            console.log(response.data); 
            localStorage.setItem('token', response.data.token); 
            alert('Successful login!');
            navigate('/main'); 
        } catch (error) {
            console.error('An error occurred!', error);
            alert("Something went wrong. Check your email and password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={logo} alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
                <button type="submit" className="login-btn">Sign In</button>
                <button type="button" className="login-btn registration-btn" onClick={() => navigate('/registration')}>Registration</button>
            </form>
        </div>
    );
}


export default Login;
