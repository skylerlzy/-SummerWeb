import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

const Circle = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);

    useEffect(() => {
        // Fetch posts for the circle
    }, [id]);

    const handlePostSubmit = () => {
        // 处理发帖逻辑
    };

    return (
        <div>
            <h1>兴趣圈 {id}</h1>
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
                {posts.map(post => <Post key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default Circle;
