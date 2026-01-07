import Alert from '@mui/material/Alert';

export const Notice = ({ notice }) => {
  if (!notice) {
    return null;
  }

  return <Alert severity={notice.type}>{notice.message}</Alert>;
};
