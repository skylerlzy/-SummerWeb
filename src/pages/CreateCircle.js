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
            setCircleName('');
            alert('Circle created successfully');
        } catch (error) {
            console.error('Error creating circle', error);
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
        </div>
    );
};

export default CreateCircle;
