import styled from '@emotion/styled';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import Alert, { AlertProps } from '@mui/material/Alert';
import React, { memo } from 'react';

interface IToastProps {
  open: boolean;
  type: AlertProps['severity'];
  message: string;
  setOpen: (value: boolean) => void;
  horizontalAlignment: SnackbarOrigin['horizontal'];
  verticalAlignment: SnackbarOrigin['vertical'];
}
function Toast(props: IToastProps) {
  const { open, type, message, setOpen, horizontalAlignment, verticalAlignment } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const Message = styled.p`
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 22px;
  `;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: verticalAlignment,
        horizontal: horizontalAlignment
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert variant="filled" elevation={6} onClose={handleClose} severity={type}>
        <Message>{message}</Message>
      </Alert>
    </Snackbar>
  );
}

Toast.defaultProps = { horizontalAlignment: 'right', verticalAlignment: 'top' };
export default memo(Toast);
