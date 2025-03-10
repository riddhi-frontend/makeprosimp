import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLike = (id) => {
        const post = posts.find(p => p.id === id);
        axios.put(`http://localhost:5000/posts/${id}`, { ...post, likes: post.likes + 1 })
            .catch(error => console.error("Error updating like:", error));
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const postsPerPage = 5;
    const startIndex = (page - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    return (
        <div>
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleSearch} 
                placeholder="Search posts by title" 
            />

            <div className="post-list">
                {paginatedPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <img src={post.image} alt={post.title} />
                        <h2>{post.title}</h2>
                        <p>{post.author}</p>
                        {/* <p>{post.likes} Likes</p> */}
                        <button onClick={() => handleLike(post.id)}>Like</button>
                        <Link to={`/post/${post.id}`}>View post</Link>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={page * postsPerPage >= filteredPosts.length}>Next</button>
            </div>
        </div>
    );
};

export default BlogPostList;
