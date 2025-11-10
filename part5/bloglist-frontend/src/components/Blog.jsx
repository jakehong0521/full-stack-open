import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, isUserCreated, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.put(updatedBlog);
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteById(blog.id);
      onDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "hide" : "view"}
        </button>
      </div>

      {isExpanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLikeClick}>like</button>
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
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

export default Blog;
