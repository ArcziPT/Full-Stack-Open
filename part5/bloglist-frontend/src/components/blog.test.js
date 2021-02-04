import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

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