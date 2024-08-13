import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Circle = () => {
    const { circleId } = useParams();  // 获取 URL 参数中的圈子 ID
    const [circle, setCircle] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const fetchCircleAndPosts = async () => {
            try {
                // 获取圈子的详细信息
                const circleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/circles/${circleId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCircle(circleResponse.data);

                // 获取圈子的帖子
                const postsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/circles/${circleId}/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(postsResponse.data);
            } catch (error) {
                console.error('Error fetching circle or posts', error);
            }
        };

        if (circleId) {
            fetchCircleAndPosts();
        }
    }, [circleId]);

    const handlePostSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/circles/${circleId}/posts`, {
                content: newPostContent,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNewPostContent('');
            // Refresh posts
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/circles/${circleId}/posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <div>
            <h1>{circle ? circle.name : 'Loading...'}</h1>
            {circle && (
                <div>
                    <h2>Posts in {circle.name}</h2>
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
