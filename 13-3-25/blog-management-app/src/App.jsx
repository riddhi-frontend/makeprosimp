import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPostList from './Components/BlogPostList';
import EditPost from './Components/EditPost';
import PostDetails from './Components/PostDetails';
import CreatePost from './Components/CreatePost';
import { AuthContext } from './context/AuthContext';
import LoginForm from './Components/LoginForm'; 
import Header from './Components/Header';
// import "./css/HoverSlider.css"; // Import CSS for styling

const App = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');  // Search term state
    const [showLoginForm, setShowLoginForm] = useState(false); // State to show login form

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Router>
            <div className="App">
                {/* Use the Header component */}
                <Header 
                    user={user} 
                    logout={logout} 
                    searchTerm={searchTerm} 
                    handleSearch={handleSearch} 
                    setShowLoginForm={setShowLoginForm} 
                />

                {/* Show Login Form when showLoginForm is true */}
                {showLoginForm && (
                    <div className="login-form-container">
                        <LoginForm setShowLoginForm={setShowLoginForm} login={login} />
                    </div>
                )}

                <Routes>
                    <Route path="/" element={<BlogPostList searchTerm={searchTerm} />} />
                    <Route path="/post/:id" element={<PostDetails />} /> 
                    <Route path="/create" element={<CreatePost />} /> {/* Create post route */}
                    <Route path="/edit/:id" element={<EditPost />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;