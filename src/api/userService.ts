import { AxiosResponse } from 'axios';
import { SESSION_STORAGE_KEY } from '../constants/auth';
import { default as axios } from './Instance';

const getCurrentUser = () => {
  const userData = localStorage.getItem(SESSION_STORAGE_KEY);
  if (userData !== null) {
    return JSON.parse(userData);
  } else {
    return null;
  }
};

const setCurrentUser = (userData: any) => {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    const token = userData.tokenData.token;
    axios.interceptors.request.use(function (config) {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  } catch (error) {
    console.log(error);
  }
};
const updateCurrentUser = (userData: AxiosResponse<any, any>) => {
  const user = getCurrentUser();
  user.data = userData.data;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
};

const signUp = (email: string, password: string, firstName: string, lastName: string) =>
  axios
    .post('signup', {
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName
    })
    .then((response) => {
      setCurrentUser(response.data);
      return response.data;
    })
    .catch((response) => {
      if ((response.status = 409)) {
        throw new Error('User Already Exists');
      }
      throw new Error('Register Failed');
    });

const updateUser = (
  companyName: string,
  companyType: string,
  registrationNumber: string,
  pan: string
) => {
  const userId = getCurrentUser().data._id;
  return axios
    .patch(`users/${userId}`, {
      company: companyName,
      companyType: companyType,
      registrationNumber: registrationNumber,
      pan: pan
    })
    .then((response) => {
      updateCurrentUser(response.data);
      return response.data;
    })
    .catch((error) => {
      throw new Error('Registation Failed');
    });
};

const login = (email: string, password: string) => {
  return axios
    .post('login', {
      email: email,
      password: password
    })
    .then((response) => {
      setCurrentUser(response.data);
      return response.data;
    })
    .catch((error) => {
      throw new Error('Login Failed');
    });
};

const logout = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

const resetActivationMail = (email: string) => {
  return axios
    .post('/reset-activation-mail', { email: email })
    .then((response) => {
      return 'success';
    })
    .catch((response) => {
      return 'failed';
    });
};

const forgotPassword = (email: string) => {
  return axios
    .post('/forgot-password', { email: email })
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw Error('Reset Password Activation Link Not Generated');
    });
};

const resetPassword = (
  password: string,
  confirmPassword: string,
  resetToken: string | undefined
) => {
  return axios
    .patch(`/reset-password/${resetToken}`, {
      password: password,
      confirmPassword: confirmPassword
    })
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw Error('Reset Password Failed');
    });
};

const activateAccount = (activateToken: string | undefined) => {
  return axios
    .patch(`/activate/${activateToken}`)
    .then((response) => {
      setCurrentUser(response.data);
      return response.data;
    })
    .catch((response) => {
      throw Error('Account Activation Failed');
    });
};
const activateGoogleSignUp = (googleToken: string | undefined) => {
  return axios
    .get(`/auth/google/callback${googleToken}`)
    .then((response) => {
      setCurrentUser(response.data);
      return response.data;
    })
    .catch((response) => {
      throw Error('Google Account Activation Failed');
    });
};

const updateUserProfile = (userId: string, userData: any) => {
  return axios
    .patch(`/users/${userId}`, userData)
    .then((response) => {
      updateCurrentUser(response.data);
      return response.data;
    })
    .catch((response) => {
      throw new Error('error on user profile update');
    });
};

export default {
  login,
  signUp,
  logout,
  getCurrentUser,
  updateUser,
  resetActivationMail,
  forgotPassword,
  resetPassword,
  activateAccount,
  activateGoogleSignUp,
  updateUserProfile
};
