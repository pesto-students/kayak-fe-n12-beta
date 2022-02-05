import { Container } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import UserService from '../../api/userService';
import { useSnackbarContext } from '../../components/Snackbar/context';
import UserContext from '../../context/UserContext';
import EventsProvider from '../../providers/EventsProvider';
import AccountTabs from './AccountTabs';
import CompanyDetails from './CompanyDetails';
import { userDetailsSchema } from './constants';
import PersonalInformation from './PersonalInformation';
import UserAddress from './UserAddress';
import UserEvents from './UserEvents';
import UserPortfolio from './UserPortfolio';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const { type } = useParams();
  const {
    ToastService: { showToast }
  } = useSnackbarContext();
  const handleSubmit = (userData: any) => {
    UserService.updateUserProfile(user._id, userData)
      .then((response) => {
        setUser(response.data);
        showToast(true, 'success', 'Profile updated successfully');
      })
      .catch((response) => {
        showToast(true, 'error', 'Could not Update Profile');
      });
  };
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <AccountTabs />
      {type === 'profile' && (
        <Formik initialValues={user} validataionSchema={userDetailsSchema} onSubmit={handleSubmit}>
          <Form>
            <PersonalInformation />
            <UserAddress />
            <CompanyDetails />
          </Form>
        </Formik>
      )}
      <EventsProvider>
        {type === 'events' && <UserEvents />}
        {type === 'portfolio' && <UserPortfolio />}
      </EventsProvider>
    </Container>
  );
}

export default UserProfile;
