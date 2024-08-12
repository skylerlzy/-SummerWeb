import React, { useState } from 'react';
import axios from 'axios';

const CreateCircle = () => {
    const [circleName, setCircleName] = useState('');

    const handleCreateCircle = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/circles`, {
                name: circleName,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Handle success (e.g., redirect or show a message)
        } catch (error) {
            console.error('Error creating circle', error);
        }
    };

    return (
        <div>
            <h1>创建兴趣圈</h1>
            <input
                type="text"
                placeholder="兴趣圈名称"
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
            />
            <button onClick={handleCreateCircle}>创建</button>
        </div>
    );
};

export default CreateCircle;
