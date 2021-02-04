import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "MyBook",
    author: "John Smith",
    likes: 0,
    url: "http://mybook.com"
  }

  const component = render(
    <Blog blog={blog} removeBlog={() => {}}></Blog>
  )

  const blogComponent = component.container.querySelector('.blog')
  expect(blogComponent).toHaveTextContent('MyBook')
  expect(blogComponent).toHaveTextContent('John Smith')
})