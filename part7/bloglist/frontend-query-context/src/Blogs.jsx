import { useContext, useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { NotificationContext } from './NotificationContext';
import blogService from './services/blogs';
import { UserContext } from './UserContext';

const Blogs = () => {
  const queryClient = useQueryClient();

  const { setNotification } = useContext(NotificationContext);
  const user = useContext(UserContext);

  const blogFormRef = useRef();

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification({
        message: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
        type: 'success',
      });
    },
  });

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
  };

  const handleDeleteBlog = (blogId) => {
    deleteBlogMutation.mutate(blogId);
  };

  const handleLikeClick = (blog) => {
    likeBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      <div style={{ marginTop: '12px' }}>
        {blogs
          .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onDelete={handleDeleteBlog}
              onLikeClick={() => handleLikeClick(blog)}
              isUserCreated={user.id === blog.user}
            />
          ))}
      </div>
    </>
  );
};

export default Blogs;
