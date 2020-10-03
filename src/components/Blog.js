import React, { useState, useRef } from 'react'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, handleLikeClick, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const BlogRef = useRef()

  const toggleVisibility = () => {
    BlogRef.current.toggleVisibility()
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></div>
      <div>{blog.author}</div>

      <Togglable buttonLabel="" ref={BlogRef}>
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button className="likeButton" onClick={() => handleLikeClick(blog)}>like</button></div>
          {blog.user && user.username === blog.user.username && <button onClick={() => deleteBlog(blog)}>remove</button>}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
