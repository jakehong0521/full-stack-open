import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.put(updatedBlog);
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
