// libs
import React, { memo, useCallback, useMemo } from 'react';
import axios from '../../api/Instance';
import { useSnackbarContext } from '../../components/Snackbar/context';
// context
import AuthContext from './context';

interface UploadProviderProps {
  children: React.ReactNode;
}

function UploadProvider({ children }: UploadProviderProps) {
  const {
    ToastService: { showToast }
  } = useSnackbarContext();
  const uploadFile = useCallback(async (file: File, type: string) => {
    try {
      const payload = new FormData();
      payload.append('file', file);
      const response = await axios.post(`/upload?type=${type}`, payload);
      if (!response.data?.data) throw response.data;
      return response.data.data;
    } catch (error: any) {
      console.log(error);
      showToast(true, 'error', error.message);
    }
  }, []);

  const values = useMemo(
    () => ({
      uploadFile
    }),
    [uploadFile]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default memo(UploadProvider);
