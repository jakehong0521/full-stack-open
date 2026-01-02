import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
  },
});

const { setNotification } = notificationSlice.actions;

export { setNotification };

export default notificationSlice.reducer;
