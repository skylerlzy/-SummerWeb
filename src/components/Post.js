import React, { useState } from 'react';

const Post = ({ post }) => {
    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        // 处理评论逻辑
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post Image" />}
            <div>
                <input
                    type="text"
                    placeholder="评论..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>评论</button>
            </div>
        </div>
    );
};

export default Post;
