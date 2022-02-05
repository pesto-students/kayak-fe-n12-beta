import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ActionButton,
  ActionWrapper,
  Container,
  Heading,
  SecondaryActionButton,
  SubHeading,
  SuccessIcon
} from './styles';

function PaymentSuccess() {
  const { transactionId } = useParams();
  return (
    <Container>
      <SuccessIcon />
      <Heading>Your payment is completed successfully!</Heading>
      <SubHeading>{`Transaction Id: ${transactionId}`}</SubHeading>
      <ActionWrapper>
        <Link to="/home">
          <SecondaryActionButton variant="outlined">Go Home</SecondaryActionButton>
        </Link>
        <Link to="accounts/portfolio">
          <ActionButton variant="contained">Go to Portfolio</ActionButton>
        </Link>
      </ActionWrapper>
    </Container>
  );
}

export default memo(PaymentSuccess);
