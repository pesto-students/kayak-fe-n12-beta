import React, { createContext } from 'react';

export interface IUser {
  contactNumber: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  company: string;
  companyType: string;
  pan: string;
  type: string;
  portfolio: string[];
  events: string[];
  picture: string;
  googleId: string | null;
  verified: boolean;
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IToken {
  expiresIn: number;
  token: string;
}

interface IUserContextProps {
  isUserLoggedIn: boolean;
  user: IUser;
  token: IToken;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setToken: React.Dispatch<React.SetStateAction<any>>;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialUserInformation: IUserContextProps = {
  user: {
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
    firstname: '',
    lastname: ''
  },
  token: {
    expiresIn: 0,
    token: ''
  },
  isUserLoggedIn: false,
  setUser: () => {},
  setToken: () => {},
  setIsUserLoggedIn: () => {}
};

const UserContext = createContext(initialUserInformation);

export default UserContext;
