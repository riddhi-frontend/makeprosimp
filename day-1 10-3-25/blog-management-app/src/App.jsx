import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPostList from './Components/BlogPostList';
import EditPost from './Components/EditPost';
import PostDetails from './Components/PostDetails';
import CreatePost from './Components/CreatePost';
import { AuthContext } from './context/AuthContext'; 

const App = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkmode') === 'true'; 
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newDarkModeState = !prev;
            localStorage.setItem('darkmode', newDarkModeState); 
            return newDarkModeState;
        });
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark' : ''; 
    }, [isDarkMode]);

    return (
        <Router>
            <div className={`App ${isDarkMode ? 'dark' : ''}`}>
                <header>
                    <h1>Blog Management</h1>
                    {user ? (
                        <button onClick={logout}>Logout</button>
                    ) : (
                        <button onClick={() => login('admin', '123456')}>Login</button>
                    )}
                    <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
                </header>

                <Routes>
                    <Route path="/" element={<BlogPostList />} />
                    <Route path="/post/:id" element={<PostDetails />} /> {/* Corrected route */}
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
