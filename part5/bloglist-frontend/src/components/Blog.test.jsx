import { render } from '@testing-library/react'

import Blog from './Blog'

test('renders blog title and author but not URL or number of likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
  }
  const { container } = render(
    <Blog blog={blog} isUserCreated={false} onDelete={() => {}} />
  )

  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.likes)
})
