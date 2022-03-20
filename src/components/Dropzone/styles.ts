import styled from '@emotion/styled';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export const Content = styled.div`
  height: 100%;
  min-height: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #cdd4ea;
  position: relative;
  border-radius: 4px;
`;

export const FileInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const UploadIcon = styled(FileUploadIcon)`
  width: 48px;
  height: 48px;
  color: #67c6b3;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 62px;
  padding: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Span = styled.span`
  color: #485388;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  margin-top: 18px;
  margin-right: 4px;
  &.custom {
    color: #67c6b3;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  .MuiLinearProgress-colorPrimary {
    background-color: transparent;
  }
  .MuiLinearProgress-barColorPrimary {
    background-color: #67c6b3;
  }
`;
