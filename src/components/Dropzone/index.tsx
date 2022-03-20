//libs
import { LinearProgress } from '@mui/material';
import React, { memo } from 'react';
import { Content, FileInput, ProgressContainer, Span, UploadIcon, Wrapper } from './styles';

//interface
interface IDropzoneProps {
  type: string;
  file: File | undefined;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  accept: string;
  uploadStatus: boolean;
}

function Dropzone({ file, onChangeHandler, accept, uploadStatus }: IDropzoneProps) {
  return (
    <Content>
      <FileInput accept={accept} onChange={(event) => onChangeHandler(event)} type="file" />
      <UploadIcon className="icon-upload" />
      {!file && (
        <Wrapper>
          <Span>Drop here or</Span>
          <Span className="custom">browse file</Span>
        </Wrapper>
      )}
      {file && uploadStatus && <Span>{`${file.name} is uploading, please wait...`}</Span>}
      {file && !uploadStatus && <Span>{file.name}</Span>}
      {file && uploadStatus && (
        <ProgressContainer>
          <LinearProgress color="primary" />
        </ProgressContainer>
      )}
    </Content>
  );
}

Dropzone.defaultProps = {
  type: 'new'
};

export default memo(Dropzone);
