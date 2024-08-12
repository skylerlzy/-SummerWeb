import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Circle = () => {
    const [circles, setCircles] = useState([]);
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const fetchCircles = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/circles`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCircles(response.data);
            } catch (error) {
                console.error('Error fetching circles', error);
            }
        };
        fetchCircles();
    }, []);

    const handleCircleSelect = async (circleId) => {
        setSelectedCircle(circleId);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/circles/${circleId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const handlePostSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/circles/${selectedCircle}/posts`, {
                content: newPostContent,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNewPostContent('');
            // Refresh posts
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/circles/${selectedCircle}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <div>
            <h1>Interest Circles</h1>
            <div>
                {circles.map((circle) => (
                    <button key={circle.id} onClick={() => handleCircleSelect(circle.id)}>
                        {circle.name}
                    </button>
                ))}
            </div>
            {selectedCircle && (
                <div>
                    <h2>Posts in {circles.find(c => c.id === selectedCircle)?.name}</h2>
                    <textarea
                        placeholder="Write your post..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <button onClick={handlePostSubmit}>Submit Post</button>
                    <div>
                        {posts.map((post) => (
                            <div key={post.id}>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Circle;
