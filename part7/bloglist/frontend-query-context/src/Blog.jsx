import { useContext } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

import blogService from './services/blogs';
import userService from './services/users';
import { UserContext } from './UserContext';

const Blog = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { blogId } = useParams();
  const {
    data: blog,
    isLoading,
    error: getBlogError,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getById(blogId),
    retry: false,
  });
  const { data: blogger } = useQuery({
    enabled: !!blog,
    queryKey: ['author', blog?.user],
    queryFn: () => userService.getById(blog.user),
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteById,
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleDeleteBlog = async () => {
    deleteBlogMutation.mutate(blogId);
  };

  const handleLikeClick = () => {
    if (blog) {
      likeBlogMutation.mutate({
        ...blog,
        likes: blog.likes + 1,
      });
    }
  };

  if (isLoading) {
    return <div>Loading blog data...</div>;
  } else if (blog) {
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
          <button
            disabled={likeBlogMutation.isPending}
            onClick={handleLikeClick}
          >
            like
          </button>
        </div>
        {blogger && <div>added by {blogger.name}</div>}
        {!!blogger && !!user && blogger.id === user.id && (
          <button
            disabled={deleteBlogMutation.isPending}
            onClick={handleDeleteBlog}
          >
            remove
          </button>
        )}

        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  } else if (getBlogError?.status === 404) {
    return <div>Blog not found</div>;
  } else if (getBlogError) {
    return <div>Error: {getBlogError.message}</div>;
  } else {
    return <div>Something went wrong. Please try again later</div>;
  }
};

export default Blog;
