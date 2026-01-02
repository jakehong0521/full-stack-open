import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser() {
      return null;
    },
    setUser(_state, action) {
      return action.payload;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    return user;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    loginService.logout();
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
