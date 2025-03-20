import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const BlogPostList = ({ searchTerm }) => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);
    
    const postsPerPage = 3; // Show 5 posts per slide
    const totalSlides = Math.ceil(posts.length / postsPerPage);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts");
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load posts.");
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Auto-slide function (every 5 seconds)
    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [hovered, totalSlides]);

    const handleLike = async (id) => {
        const post = posts.find((p) => p.id === id);
        const updatedPost = { ...post, likes: post.likes + 1 };

        try {
            await axios.put(`http://localhost:5000/posts/${id}`, updatedPost);
            setPosts(posts.map((p) => (p.id === id ? updatedPost : p)));
        } catch (err) {
            setError("Failed to update like.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}`);
                setPosts(posts.filter((post) => post.id !== id));
            } catch (err) {
                setError("Failed to delete post.");
            }
        }
    };

    // Filtered posts based on search
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current posts to display in slide
    const currentPosts = filteredPosts.slice(
        currentIndex * postsPerPage,
        (currentIndex + 1) * postsPerPage
    );

    if (loading) return <div>Loading posts...</div>;

    return (
        <div 
            className="blog-post-list" 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
        >
            {error && <div className="error-message">{error}</div>}

            {/* Accordion Slider */}
            <div className="accordion-slider">
                {currentPosts.map((post, index) => (
                    <div
                        key={post.id}
                        className={`accordion-slide ${hoverIndex === index ? "expanded" : ""}`}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <div className="post-item">
                            <img src={post.image} alt={post.title} className="post-image" />
                            <div className="post-content">
                                <h2>{post.title}</h2>
                                <p>{post.author}</p>
                                <button className="btn-4" onClick={() => handleLike(post.id)}><AiFillLike />
                                </button>
                                <Link className="btn-5" to={`/post/${post.id}`}>
                                    View post
                                </Link>
                                {user && user.role === "admin" && (
                                    <>
                                        <button className="btn-6" onClick={() => handleDelete(post.id)}>Delete</button>
                                        <Link className="btn-7" to={`/edit/${post.id}`}>
                                            Edit
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Navigation */}
            <div className="dots-navigation">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default BlogPostList;
