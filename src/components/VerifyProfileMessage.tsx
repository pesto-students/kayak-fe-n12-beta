import { Alert, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import UserService from '../api/userService';
import SendIcon from '@mui/icons-material/Send';

export default function VerifyProfileMessage() {
  const { isUserLoggedIn, user } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    UserService.resetActivationMail(user.email)
      .then((response) => {
        setMessage('Activation Link Sent.');
      })
      .catch((response) => {
        setMessage('Unable to send Activation Link. ');
      });
  };

  if (isUserLoggedIn && !user.verified)
    return (
      <Alert sx={{ color: 'primary' }} severity="warning">
        Your profile is not verified. Please check your inbox or Click{' '}
        <Button onClick={handleClick} size="small" endIcon={<SendIcon />}>
          Re-Send
        </Button>{' '}
        if you haven&apos;t received verification email.
        {message}
      </Alert>
    );
  else return <React.Fragment></React.Fragment>;
}
