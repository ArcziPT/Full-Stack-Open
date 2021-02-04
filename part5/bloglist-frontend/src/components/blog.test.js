import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: "MyBook",
    author: "John Smith",
    likes: 0,
    url: "http://mybook.com",
    user: {
        username: "user123"
    }
  }

  const component = render(
    <Blog blog={blog} removeBlog={() => {}}></Blog>
  )

  const blogComponent = component.container.querySelector('.blog')
  expect(blogComponent).toHaveTextContent('MyBook')
  expect(blogComponent).toHaveTextContent('John Smith')
})

test('renders details after button click', () => {
    const blog = {
      title: "MyBook",
      author: "John Smith",
      likes: 0,
      url: "http://mybook.com",
      user: {
        username: "user123"
      }
    }
  
    const component = render(
      <Blog blog={blog} removeBlog={() => {}}></Blog>
    )

    const button = component.getByText('VIEW')
    fireEvent.click(button)
  
    const blogComponent = component.container.querySelector('.blog')
    expect(blogComponent).toHaveTextContent('MyBook')
    expect(blogComponent).toHaveTextContent('John Smith')
    expect(blogComponent).toHaveTextContent('http://mybook.com')
    expect(blogComponent).toHaveTextContent('0')
})

test('blog form calls handler', () => {
    const mockHandler = jest.fn()

    const component = render(
        <BlogForm addBlog={mockHandler}></BlogForm>
    )

    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const title = component.container.querySelector('#title')

    fireEvent.change(author, {target: {value: 'John Smith'}})
    fireEvent.change(url, {target: {value: 'http://mybook.com'}})
    fireEvent.change(title, {target: {value: 'MyBook'}})

    const button = component.getByText('CREATE')
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
        author: 'John Smith',
        title: 'MyBook',
        url: 'http://mybook.com'
    })
})