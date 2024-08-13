import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCircle = () => {
    const [circleName, setCircleName] = useState('');
    const [error, setError] = useState(''); // 添加一个新的state用于存储错误信息
    const navigate = useNavigate();

    const handleCreateCircle = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/circles`, {
                name: circleName,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const circleId = response.data._id;
            setCircleName('');
            navigate(`/circle/${circleId}`);
        } catch (error) {
            console.error('Error creating circle', error);
            setError('Failed to create circle. Please try again.'); // 设置错误信息
        }
    };

    return (
        <div>
            <h1>Create Circle</h1>
            <input
                type="text"
                placeholder="Circle Name"
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
            />
            <button onClick={handleCreateCircle}>Create</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} // 显示错误信息
        </div>
    );
};

export default CreateCircle;
