import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()  
    const navigate = useNavigate()  
    const [post, setPost] = useState(null)  

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)  
            .then(response => setPost(response.data))  
            .catch(error => console.error(error))  
    }, [id])  

    const handleChange = (e) => {
        const { name, value } = e.target  
        setPost(prevPost => ({ ...prevPost, [name]: value }))  
    }

    const handleSubmit = (e) => {
        e.preventDefault();  
    
        const userConfirmed = window.confirm("Are you sure you want to update this post?");
        
        if (userConfirmed) {
            // If user clicks "OK", update the post and navigate to home
            axios.put(`http://localhost:5000/posts/${id}`, post)  
                .then(() => {
                    alert("Post updated successfully!");
                    navigate('/');  // Redirect to home after success
                })
                .catch(error => {
                    console.error(error);  
                    alert("An error occurred while updating the post.");  
                });
        } else {
            // If user clicks "Cancel", navigate to home without updating
            navigate('/');
        }
    }

    if (!post) return <div className="loading-message">Loading...</div>

    return (
        <div className="edit-post-page">
        <div className="wrapper">
            <div className="edit-post-container">
                <h2>Edit Post</h2>
                <form className="edit-post-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            className="input-field"
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            className="input-field"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            id="image"
                            className="input-field"
                            type="text"
                            name="image"
                            value={post.image}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit">Update Post</button>
                </form>
            </div>
        </div></div>
    )
}

export default EditPost
