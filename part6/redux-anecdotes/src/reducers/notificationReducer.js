import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

const { addNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (message, durationInSeconds) => {
  return (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, durationInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
