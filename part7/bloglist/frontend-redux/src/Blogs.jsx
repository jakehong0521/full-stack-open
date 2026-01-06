import { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { createBlog } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await dispatch(createBlog(blogObject));
    dispatch(
      setNotification({
        message: `A new blog "${blogObject.title}" by ${blogObject.author} added`,
        type: 'success',
      }),
    );
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
