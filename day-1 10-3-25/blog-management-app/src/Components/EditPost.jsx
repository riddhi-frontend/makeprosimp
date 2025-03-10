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
    e.preventDefault()
    axios.put(`http://localhost:5000/posts/${id}`, post)
      .then(() => {
        alert('Post updated successfully')
        navigate(`/post/${id}`)  
      })
      .catch(error => console.error(error))
  }

  if (!post) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={post.title} 
        onChange={handleChange} 
      />
      <textarea 
        name="content" 
        value={post.content} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        name="image" 
        value={post.image} 
        onChange={handleChange} 
      />
      <button type="submit">Update Post</button>
    </form>
  )
}
export default EditPost