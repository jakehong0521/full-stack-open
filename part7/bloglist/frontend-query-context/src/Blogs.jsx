import { useContext, useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { NotificationContext } from './NotificationContext';
import blogService from './services/blogs';

const Blogs = () => {
  const queryClient = useQueryClient();

  const { setNotification } = useContext(NotificationContext);

  const blogFormRef = useRef();

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
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

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      <div style={{ marginTop: '12px' }}>
        {blogs
          .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
          .map((blog) => (
            <Link key={blog.id} style={linkStyle} to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          ))}
      </div>
    </>
  );
};

const linkStyle = {
  display: 'block',
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  textTransform: 'capitalize',
};

export default Blogs;
