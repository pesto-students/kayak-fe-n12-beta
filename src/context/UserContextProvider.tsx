import React, { useState } from 'react';
import UserContext, { IToken, IUser } from './UserContext';

interface IUserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    contactNumber: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
    company: '',
    companyType: '',
    pan: '',
    type: '',
    portfolio: [],
    events: [],
    picture: '',
    googleId: null,
    verified: false,
    _id: '',
    email: '',
    password: '',
    firstname: 'abhiske',
    lastname: ''
  });
  const [token, setToken] = useState<IToken>({
    expiresIn: 0,
    token: ''
  });

  const initialUserInformation = {
    isUserLoggedIn: isUserLoggedIn,
    user: user,
    token: token,
    setToken: setToken,
    setUser: setUser,
    setIsUserLoggedIn: setIsUserLoggedIn
  };

  return <UserContext.Provider value={initialUserInformation}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
