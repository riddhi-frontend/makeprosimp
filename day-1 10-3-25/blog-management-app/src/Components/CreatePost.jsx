import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = { title, content, image, author, likes: 0, creaAt: new Date()}
        axios.post('https://localhost:5000/posts', newPost) .then(response => {
            alert('Post created successfully')
        })
        .catch(error => console.error(error))
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <input type="Image url" placeholder="image" value={image} onChange={(e) => setImage(e.target.value) } />
                <button type="submit">Create Post</button>
            </form>
        </>
    )
}
export default CreatePost