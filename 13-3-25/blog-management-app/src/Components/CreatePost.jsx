import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const CreatePost = () => {
  const { user } = useContext(AuthContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [imageError, setImageError] = useState('')
  const [authorError, setAuthorError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  // Validate image URL
  const isValidImageUrl = (url) => {
    const externalUrlPattern = /^(https?:\/\/)/
    const internalUrlPattern = /^(\/|images\/)/
    return externalUrlPattern.test(url) || internalUrlPattern.test(url)
  }

  // Handle dynamic validation for Title
  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value)

    if (!value) {
      setTitleError("This field is required.")
    } else {
      setTitleError("") // Clear error when valid input is entered
    }
  }

  // Handle dynamic validation for Content
  const handleContentChange = (e) => {
    const value = e.target.value
    setContent(value)

    if (!value) {
      setContentError("This field is required.")
    } else {
      setContentError("") // Clear error when valid input is entered
    }
  }

  // Handle Author Validation
  const handleAuthorChange = (e) => {
    const value = e.target.value
    setAuthor(value)

    if (!/^[A-Za-z\s]*$/.test(value)) {
      setAuthorError("Author name should contain only letters and spaces.")
    } else {
      setAuthorError("")
    }
  }

  // Handle Image URL Validation Dynamically
  const handleImageChange = (e) => {
    const value = e.target.value
    setImage(value)

    if (!value) {
      setImageError("This field is required.")
    } else if (!isValidImageUrl(value)) {
      setImageError("Image URL must be a valid external or internal link.")
    } else {
      setImageError("") // Clear error if valid
    }
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError('')
    setContentError('')
    setImageError('')
    setAuthorError('')
    setSubmitError('')

    let valid = true

    if (!title) {
      setTitleError("This field is required.")
      valid = false
    }
    if (!content) {
      setContentError("This field is required.")
      valid = false
    }
    if (!image) {
      setImageError("This field is required.")
      valid = false
    } else if (!isValidImageUrl(image)) {
      setImageError("Image URL must be a valid external or internal link.")
      valid = false
    }
    if (!author) {
      setAuthorError("This field is required.")
      valid = false
    } else if (!/^[A-Za-z\s]+$/.test(author)) {
      setAuthorError("Author name should contain only letters and spaces.")
      valid = false
    }

    if (!valid) {
      return
    }

    const newPost = { title, content, image, author, likes: 0, createdAt: new Date() }

    axios.post('http://localhost:5000/posts', newPost)
      .then(response => {
        alert('Post created successfully')
        navigate('/')
      })
      .catch(error => {
        console.error(error)
        setSubmitError("There was an error creating the post. Please try again.")
      })
  }

  const handleReset = () => {
    setTitle('')
    setContent('')
    setImage('')
    setAuthor('')
    setTitleError('')
    setContentError('')
    setImageError('')
    setAuthorError('')
    setSubmitError('')
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="creatmain">
      <div className="create-post-container">
        <h2>Create a New Post</h2>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange} // Updated function here
          />
          {titleError && <div className="error-message">{titleError}</div>}

          <textarea
            placeholder="Content"
            value={content}
            onChange={handleContentChange} // Updated function here
          />
          {contentError && <div className="error-message">{contentError}</div>}

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={handleImageChange} // Updated function here
            className="imagepost"
          />
          {imageError && <div className="error-message">{imageError}</div>}

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={handleAuthorChange}
          />
          {authorError && <div className="error-message">{authorError}</div>}

          {submitError && <div className="error-message submit-error">{submitError}</div>}

          <div className="c-btn">
            <button type="submit">Create</button>
            <button type="button" className="reset" onClick={handleReset}>Reset</button>
            <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost