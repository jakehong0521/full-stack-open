import { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { createBlog, deleteBlogById, likeBlog } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
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

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlogById(blogId));
  };

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog));
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
