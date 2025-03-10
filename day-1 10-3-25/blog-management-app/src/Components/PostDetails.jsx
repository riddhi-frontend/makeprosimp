import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Using useParams hook

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams(); // Get post ID from URL

    useEffect(() => {
        // Fetch post data using the ID from the URL
        axios.get(`http://localhost:5000/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post details:", error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>{post.title}</h2> {/* Corrected typo */}
            <p>{post.content}</p>
            <img src={post.image} alt={post.title} />
            <p>By {post.author}</p>
            <p>{post.likes} Likes</p>
        </div>
    );
};

export default PostDetails;
