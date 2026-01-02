import { useState } from 'react';

const Blog = ({ blog, isUserCreated, onLikeClick, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle} title="Blog">
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'hide' : 'view'}
        </button>
      </div>

      {isExpanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>{' '}
            <button name="like" onClick={onLikeClick}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {isUserCreated && <button onClick={handleDeleteClick}>remove</button>}
        </div>
      )}
    </div>
  );
};

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

export default Blog;
