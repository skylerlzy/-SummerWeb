import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Circle = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append('content', newPostContent);
        if (newPostImage) {
            formData.append('image', newPostImage);
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });

        setNewPostContent('');
        setNewPostImage(null);
        // Refresh posts
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
        setPosts(response.data);
    };

    return (
        <div>
            <h1>兴趣圈</h1>
            <textarea
                placeholder="写下你的帖子..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setNewPostImage(e.target.files[0])}
            />
            <button onClick={handlePostSubmit}>发帖</button>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt="Post Image" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Circle;
