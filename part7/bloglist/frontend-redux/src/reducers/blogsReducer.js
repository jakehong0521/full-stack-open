import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(_state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
    },
  },
});

export const { addBlog, setBlogs, updateBlog } = blogsSlice.actions;

export const createBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData);
    dispatch(addBlog(newBlog));
  };
};

export const deleteBlogById = (blogId) => {
  return async (dispatch, getState) => {
    const success = await blogService.deleteById(blogId);
    if (success) {
      const { blogs } = getState();
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      dispatch(setBlogs(updatedBlogs));
    }
  };
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.put(blogToUpdate);
    dispatch(updateBlog(blogToUpdate));
  };
};

export default blogsSlice.reducer;
