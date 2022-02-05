import { AlertProps } from '@mui/lab/Alert';
import { SnackbarOrigin } from '@mui/material';
import React, { useContext } from 'react';

export interface ISnackbarContext {
  showToast(
    open: boolean,
    type: AlertProps['severity'],
    message: string,
    horizontalAlignment?: SnackbarOrigin['horizontal'],
    verticalAlignment?: SnackbarOrigin['vertical']
  ): any;
}

export interface IToastContext {
  ToastService: ISnackbarContext;
}

const snackbarContext = React.createContext<IToastContext>({
  ToastService: {
    showToast: () => {}
  }
});

export const useSnackbarContext = () => useContext(snackbarContext);

export default snackbarContext;
