import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const createBlog = async (event) => {
      event.preventDefault()
      try{
        addBlog({author, title, url})
        setTitle('')
        setUrl('')
        setAuthor('')
      }catch(exception){
        console.log(exception)
      }
    }
  
    return (
      <div className='blogForm'>
        <form onSubmit={createBlog}>
        <div>
          title
            <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            id='url'
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">CREATE</button>
        </form> 
      </div>
    )
  }

  export default BlogForm