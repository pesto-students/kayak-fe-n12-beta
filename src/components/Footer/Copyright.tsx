import { Typography } from '@mui/material';
import { grey } from '../../styles/themeColors';

const Copyright = () => {
  return (
    <Typography fontSize={'12px'} sx={{ color: grey[700] }} py={2} variant="body2" align="left">
      Copyright &copy; Kayak {new Date().getFullYear()}. All Rights Reserved.
    </Typography>
  );
};

export default Copyright;
