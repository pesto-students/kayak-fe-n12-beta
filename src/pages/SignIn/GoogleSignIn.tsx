import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserService from '../../api/userService';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserContext from '../../context/UserContext';

export default function GoogleSignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsUserLoggedIn, setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    UserService.activateGoogleSignUp(window.location.search || '')
      .then((response) => {
        setUser(response.data);
        setToken(response.tokenData);
        setIsUserLoggedIn(true);
        navigate('/accounts/profile');
      })
      .catch((response) => {
        alert('Unable to activate account.');
        navigate('/');
      });
  }, []);
  return <LoadingSpinner />;
}
