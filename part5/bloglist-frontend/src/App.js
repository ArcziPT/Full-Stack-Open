import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'
import BlogForm from './components/BlogForm'

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const res = await handleLogin({username, password})

    setUsername('')
    setPassword('')
  }

  return (
    <div className="loginForm">
      <form onSubmit={submit}>
        <div>
          username
            <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>
  )
}

const Togglabel = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglabel.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (cred) => {
    try{
      const user = await loginService.login(cred)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      loginFormRef.current.toggleVisibility()
    }catch(exception){
      console.log(exception)
    }
  }

  const addBlog = async (blog) => {
    try{
      const res = await blogService.create(blog)
      setBlogs(blogs.concat(res))
    }catch(exception){
      console.log(exception)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <Togglabel buttonLabel="login" ref={loginFormRef}>
      <LoginForm handleLogin={handleLogin}></LoginForm>
    </Togglabel>
  )

  const info = () => (
    <div>
      <p>{user.username} is logged in</p>
      <button onClick={logout}>LOGOUT</button>
    </div>
  )

  const blogForm = () => (
    <Togglabel buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog}></BlogForm>
    </Togglabel>
  )

  const removeBlog = async (id) => {
    try{
      const res = await blogService.removeBlog()
      setBlogs(blogs.filter(b => b.id != id))
    }catch(exception){
      console.log(exception)
    }
  }

  return (
    <div>
      {user === null ? loginForm() : info()}
      {user !== null && blogForm()}
      <h2>blogs</h2>
      {blogs.sort((b1, b2) => b1.likes - b2.likes).map(blog =>
        <Blog className="blog" key={blog.id} blog={blog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App