import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const info = () => (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <button>LIKE</button>
      <p>{blog.user.username}</p>
    </div>
  )

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'HIDE' : 'VIEW'}</button>
      {show && info()}
    </div>
  )
}

export default Blog
