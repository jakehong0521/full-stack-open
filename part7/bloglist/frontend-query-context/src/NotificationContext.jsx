import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  const setNotification = (notification) => {
    notificationDispatch({
      type: 'SET',
      payload: notification,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationDispatch,
        setNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
export default NotificationContextProvider;
