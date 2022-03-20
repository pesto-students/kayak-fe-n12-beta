import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ActionButton,
  ActionWrapper,
  Container,
  FailureHeading,
  FailureIcon,
  SecondaryActionButton,
  SubHeading
} from './styles';

function PaymentFailure() {
  const { orderId } = useParams();
  return (
    <Container>
      <FailureIcon />
      <FailureHeading>Your payment is failed!</FailureHeading>
      <SubHeading>{`Order Id: ${orderId}`}</SubHeading>
      <ActionWrapper>
        <Link to="/home">
          <SecondaryActionButton variant="outlined">Go Home</SecondaryActionButton>
        </Link>
        <Link to="/accounts/portfolio">
          <ActionButton variant="contained">Go to Portfolio</ActionButton>
        </Link>
      </ActionWrapper>
    </Container>
  );
}

export default PaymentFailure;
