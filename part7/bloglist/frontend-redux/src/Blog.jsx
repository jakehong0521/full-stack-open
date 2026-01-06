import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { deleteBlogById, likeBlog } from './reducers/blogsReducer';
import userService from './services/users';

const Blog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blog = blogs?.find((blog) => blog.id === blogId);

  const [blogger, setBlogger] = useState(null);

  useEffect(() => {
    if (blog) {
      userService.getById(blog.user).then(setBlogger);
    }
  }, [blog]);

  const handleDeleteBlog = async () => {
    if (
      blog &&
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      await dispatch(deleteBlogById(blogId));
      navigate('/');
    }
  };

  const handleLikeClick = () => {
    if (blog) {
      dispatch(likeBlog(blog));
    }
  };

  if (!blogs) {
    return <div>Loading blogs...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2 style={{ textTransform: 'capitalize' }}>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={handleLikeClick}>like</button>
      </div>
      {blogger && <div>added by {blogger.name}</div>}
      {!!blogger && !!user && blogger.id === user.id && (
        <button onClick={handleDeleteBlog}>remove</button>
      )}

      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
