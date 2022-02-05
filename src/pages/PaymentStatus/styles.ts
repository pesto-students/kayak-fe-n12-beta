import styled from '@emotion/styled';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, Grid } from '@mui/material';

export const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

export const Heading = styled.h5`
  font-size: 28px;
  margin: 0;
  margin-bottom: 24px;
  color: #67c6b3;
`;

export const FailureHeading = styled(Heading)`
  color: #f08080;
`;

export const SubHeading = styled.p`
  margin: 0;
  margin-bottom: 24px;
`;

export const ActionWrapper = styled(Button)`
  margin-bottom: 24px;
`;

export const ActionButton = styled(Button)`
  color: #ffffff;
  margin-left: 16px;
`;

export const SecondaryActionButton = styled(Button)``;

export const SuccessIcon = styled(AccountBalanceWalletIcon)`
  font-size: 128px;
  color: #67c6b3;
  margin-bottom: 24px;
`;

export const FailureIcon = styled(AccountBalanceWalletIcon)`
  color: #f08080;
  font-size: 128px;
  margin-bottom: 24px;
`;
