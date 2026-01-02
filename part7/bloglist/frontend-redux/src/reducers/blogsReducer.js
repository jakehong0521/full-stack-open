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
  },
});

export const { addBlog, setBlogs } = blogsSlice.actions;

export const createBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData);
    dispatch(addBlog(newBlog));
  };
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogsSlice.reducer;
