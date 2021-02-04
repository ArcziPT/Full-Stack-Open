import React, { useState } from 'react'
const Blog = ({ blog, removeBlog }) => {
  const [show, setShow] = useState(false)

  const remove = () => {
    removeBlog(blog.id)
  }

  const info = () => (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <button>LIKE</button>
      <p>{blog.user.username}</p>
      <button onClick={remove}>REMOVE</button>
    </div>
  )

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'HIDE' : 'VIEW'}</button>
      {show && info()}
    </div>
  )
}

export default Blog
