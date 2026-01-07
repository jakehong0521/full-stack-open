import { useImperativeHandle, useState } from 'react';

import Button from '@mui/material/Button';

const Togglable = ({ children, buttonLabel, ref }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} size="small" variant="contained">
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility} size="small" variant="contained">
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
