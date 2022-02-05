// libs
import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../api/Instance';
import { useSnackbarContext } from '../../components/Snackbar/context';
import { getUserDataFromLs } from '../../utils/localstorage.utils';
// context
import AuthContext from './context';
import { Payment } from './types';

interface RazorpayProviderProps {
  children: React.ReactNode;
}

function RazorpayProvider({ children }: RazorpayProviderProps) {
  const navigate = useNavigate();
  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const loadRazorpay = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const openPaymentPage = useCallback(async (orderId: string) => {
    const userData = getUserDataFromLs();
    await loadRazorpay();
    const options = {
      key: 'rzp_test_OENU95ABe19s1n',
      order_id: orderId,
      handler: function (response: any) {
        if (!response.razorpay_payment_id || response.razorpay_payment_id < 1) {
          showToast(true, 'error', 'Your Payment is failed');
          navigate(`/payment/failure/${orderId}`);
        } else {
          showToast(true, 'success', 'Your Payment is successful');
          navigate(`/payment/success/${response.razorpay_payment_id}`);
        }
      },
      prefill: {
        name: `${userData?.firstName} ${userData?.lastName}`,
        email: userData.email,
        phone_number: userData.contactNumber
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }, []);

  const createOrder = useCallback(async (body: Payment) => {
    try {
      const response = await axios.post(`/orders/create`, body);
      if (!response.data?.data) throw response.data;
      const orderId = response.data?.data?.id;
      if (orderId) openPaymentPage(orderId);
    } catch (error) {}
  }, []);

  const values = useMemo(() => ({ loadRazorpay, createOrder }), [loadRazorpay, createOrder]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default memo(RazorpayProvider);
