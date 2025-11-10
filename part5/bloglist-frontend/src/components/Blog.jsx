import { useState } from "react";

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            likes {blog.likes} <button>like</button>
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
