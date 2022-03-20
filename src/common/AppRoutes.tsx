import React from 'react';
import { Route } from 'react-router-dom';
import AuthRoute from '../components/AuthRoute';

const BrandAssets = React.lazy(() => import('../pages/BrandAssets/BrandAssets'));
const AboutUs = React.lazy(() => import('../pages/CompanyInfo/AboutUs'));
const PressRelease = React.lazy(() => import('../pages/CompanyInfo/PressRelease'));
const StatisticsOfAllEvents = React.lazy(
  () => import('../pages/CompanyInfo/StatisticsOfAllEvents')
);
const CreateEditEvent = React.lazy(() => import('../pages/EventCreateEdit'));
const EventDescription = React.lazy(() => import('../pages/EventDetails'));
const EventListing = React.lazy(() => import('../pages/EventsListing'));
const FAQList = React.lazy(() => import('../pages/FAQs/FAQList'));
const CreatorResources = React.lazy(() => import('../pages/Help/CreatorResources'));
const HelpCentre = React.lazy(() => import('../pages/Help/HelpCentre'));
const HowItWorks = React.lazy(() => import('../pages/Help/HowItWorks'));
const Landing = React.lazy(() => import('../pages/landing/Landing'));
const OurRules = React.lazy(() => import('../pages/Policy/OurRules'));
const PrivacyPolicy = React.lazy(() => import('../pages/Policy/PrivacyPolicy'));
const RefundPolicy = React.lazy(() => import('../pages/Policy/RefundPolicy'));
const TermsOfUse = React.lazy(() => import('../pages/Policy/TermsOfUse'));
const SignIn = React.lazy(() => import('../pages/SignIn/SignIn'));
const CollectUserInformation = React.lazy(() => import('../pages/SignUp/CollectUserInformation'));
const SignUp = React.lazy(() => import('../pages/SignUp/SignUp'));
const UserProfile = React.lazy(() => import('../pages/UserProfile/UserProfile'));
const ResetPassword = React.lazy(() => import('../pages/SignIn/ResetPassword'));
const ForgotPassword = React.lazy(() => import('../pages/SignIn/ForgotPassword'));
const ActivateAccount = React.lazy(() => import('../pages/SignIn/ActivateAccount'));
const GoogleSignIn = React.lazy(() => import('../pages/SignIn/GoogleSignIn'));

const PaymentSuccess = React.lazy(() => import('../pages/PaymentStatus/PaymentSuccess'));
const PaymentFailed = React.lazy(() => import('../pages/PaymentStatus/PaymentFailure'));

const AppRoutes = (
  <React.Fragment>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<Landing />} />
    <Route path="/events/:status" element={<EventListing />} />
    <Route path="/event/:eventId" element={<EventDescription />} />
    <Route
      path="/create-event"
      element={
        <AuthRoute>
          <CreateEditEvent />
        </AuthRoute>
      }
    />
    <Route
      path="/edit-event/:eventId"
      element={
        <AuthRoute>
          <CreateEditEvent />
        </AuthRoute>
      }
    />
    <Route path="/faqs" element={<FAQList />} />
    <Route path="/accounts/:type" element={<UserProfile />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/auth/activate/:token" element={<ActivateAccount />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/collectuserinfo" element={<CollectUserInformation />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/stats" element={<StatisticsOfAllEvents />} />
    <Route path="/press" element={<PressRelease />} />
    <Route path="/ourrules" element={<OurRules />} />
    <Route path="/help" element={<HelpCentre />} />
    <Route path="/creatorresources" element={<CreatorResources />} />
    <Route path="/howitworks" element={<HowItWorks />} />
    <Route path="/brandassets" element={<BrandAssets />} />
    <Route path="/termsofuse" element={<TermsOfUse />} />
    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
    <Route path="/refundpolicy" element={<RefundPolicy />} />
    <Route path="/auth/google/callback" element={<GoogleSignIn />} />
    <Route path="/payment/success/:transactionId" element={<PaymentSuccess />} />
    <Route path="/payment/failure/:orderId" element={<PaymentFailed />} />
  </React.Fragment>
);

export default AppRoutes;
