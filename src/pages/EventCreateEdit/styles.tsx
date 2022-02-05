import styled from '@emotion/styled';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid, TextField } from '@mui/material';

export const Container = styled(Grid)`
  padding: 64px;
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.form`
  padding: 48px 8px;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const DatePicker = styled(DesktopDatePicker)`
  width: 100%;
`;
