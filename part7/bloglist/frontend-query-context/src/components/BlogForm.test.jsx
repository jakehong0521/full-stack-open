import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';

test('calls createForm when a new blog is created', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
  };

  const createBlogMock = vi.fn();
  render(<BlogForm createBlog={createBlogMock} />);

  await userEvent.type(screen.getByLabelText('author:'), newBlog.author);
  await userEvent.type(screen.getByLabelText('title:'), newBlog.title);
  await userEvent.type(screen.getByLabelText('url:'), newBlog.url);
  await userEvent.click(screen.getByRole('button', { name: 'create' }));

  expect(createBlogMock).toHaveBeenCalledWith(newBlog);
});
