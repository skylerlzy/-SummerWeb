import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            // Redirect to home or another page
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <h1>登录</h1>
            <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};

export default Login;
