import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { logoutUser } from '../reducers/userReducer';

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser(null));
  };

  return (
    <div style={menuStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && (
        <div>
          <span style={{ marginRight: '0.25rem' }}>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  );
};

const menuStyle = {
  background: '#ccc',
  display: 'flex',
  gap: '0.5rem',
  padding: '0.25rem',
};

export default NavigationMenu;
