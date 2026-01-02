import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

test('renders blog title and author but not URL or number of likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
  };
  const { container } = render(
    <Blog blog={blog} isUserCreated={false} onDelete={() => {}} />,
  );

  expect(container).toHaveTextContent(blog.title);
  expect(container).toHaveTextContent(blog.author);
  expect(container).not.toHaveTextContent(blog.url);
  expect(container).not.toHaveTextContent(blog.likes);
});

test('renders blog URL and number of likes when expanded', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
  };
  render(<Blog blog={blog} isUserCreated={false} onDelete={() => {}} />);

  await userEvent.click(screen.getByText('view'));

  expect(screen.getByText(blog.url)).toBeInTheDocument();
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
});

test('calls the like handler when the like button is clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
  };
  const onLikeClickMock = vi.fn();
  render(
    <Blog
      blog={blog}
      isUserCreated={false}
      onLikeClick={onLikeClickMock}
      onDelete={() => {}}
    />,
  );

  await userEvent.click(screen.getByText('view'));
  const likeBtn = screen.getByText('like');
  await userEvent.click(likeBtn);
  await userEvent.click(likeBtn);

  expect(onLikeClickMock).toHaveBeenCalledTimes(2);
});
