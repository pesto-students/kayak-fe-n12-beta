// libs
import { createContext, useContext } from 'react';
import { Payment } from './types';

interface RazorpayContext {
  loadRazorpay?: () => Promise<boolean>;
  createOrder?: (body: Payment) => Promise<void>;
}

const initialValue: RazorpayContext = {};

const razorpayContext = createContext(initialValue);

export const useRazorpayContext = () => useContext(razorpayContext);

export default razorpayContext;
