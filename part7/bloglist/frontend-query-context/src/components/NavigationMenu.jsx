import { useContext } from 'react';

import { Link } from 'react-router';

import { UserContext } from '../UserContext';
import blogService from '../services/blogs';

const NavigationMenu = () => {
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    blogService.unsetToken();
    userDispatch({
      type: 'RESET',
    });
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
