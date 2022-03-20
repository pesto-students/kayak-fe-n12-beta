import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRazorpayContext } from '../../providers/RazorpayProvider/context';
import { Amount, Container, Heading } from './styles';

interface IRazorpayRedirectProps {
  isOpen: boolean;
  amount: string | number;
}

function RazorpayRedirect({ isOpen, amount }: IRazorpayRedirectProps) {
  const { eventId } = useParams();
  const { createOrder } = useRazorpayContext();
  const [open, setOpen] = useState<boolean>(isOpen);
  const toggleDialog = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const redirectToPayment = async () => {
    if (createOrder && eventId) {
      await createOrder({ eventId, amount, currency: 'INR' });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
      <DialogContent sx={{ padding: '16px' }}>
        <IconButton
          sx={{ position: 'absolute', top: '16px', right: '16px' }}
          onClick={toggleDialog}>
          <Close className="close" fontSize="small" color="primary" />
        </IconButton>
        <Container>
          <Heading>Are you sure you want to proceed with the payment of amount:</Heading>
          <Amount>{`₹ ${amount.toLocaleString()}`}</Amount>
        </Container>
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary" onClick={redirectToPayment}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RazorpayRedirect;
