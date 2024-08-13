import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 修改导入

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [circles, setCircles] = useState([]);
    const navigate = useNavigate(); // 修改 useHistory 为 useNavigate

    const handleSubmit = async () => {
        try {
            if (isRegister) {
                await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    username,
                    password,
                });
                alert('Registration successful');
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                    username,
                    password,
                });
                localStorage.setItem('token', response.data.token);
                const circlesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user-circles`, {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                });
                setCircles(circlesResponse.data);
                navigate('/circle'); // 修改 history.push 为 navigate
            }
            setError('');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>{isRegister ? 'Register' : 'Login'}</button>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
            {error && <p>{error}</p>}
            {circles.length > 0 && (
                <div>
                    <h2>Your Circles:</h2>
                    <ul>
                        {circles.map((circle) => (
                            <li key={circle.id}>{circle.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;
