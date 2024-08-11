import React, { useState } from 'react';

const CreateCircle = () => {
    const [circleName, setCircleName] = useState('');

    const handleCreateCircle = () => {
        // 处理创建兴趣圈逻辑
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
