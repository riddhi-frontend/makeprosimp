import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const PostDetails = () => {
    const [post, setPost] = useState(null)  // State hook to store post data, initialized to null
    const { id } = useParams()  // Extract the 'id' from the URL parameters (e.g., /posts/:id)

    // useEffect hook to fetch the post data from the server when the component mounts or 'id' changes
    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)  // Sending GET request to fetch post by 'id'
            .then(response => setPost(response.data))  // On success, update 'post' state with the fetched data
            .catch(error => console.error("Error fetching post details:", error))  // Log any errors
    }, [id])  // Dependency array ensures the effect runs only when 'id' changes

    // If the post data has not been fetched yet, show a loading message
    if (!post) return <div>Loading...</div>

    return (
        <div className="viewpost">
            <div className="postviewarea">
            {/* Display post title, content, image, and other details */}
            <h2>Title: {post.title}</h2>  {/* Post title */}
            <p>Content: {post.content}</p>  {/* Post content */}
            <img className="viewimg" src={post.image} alt={post.title} />  {/* Post image */}
            <p>By {post.author}</p>  {/* Post author */}
            <p>{post.likes} Likes</p>  {/* Post like count */}
            <p>Created Date & Time: {post.createdAt}</p>  {/* Post creation date/time */}
            </div>
        </div>
    )
}

export default PostDetails