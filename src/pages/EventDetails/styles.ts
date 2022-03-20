import styled from '@emotion/styled';
import { primary } from '../../styles/themeColors';

export const Container = styled.div`
  min-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Heading = styled.h5`
  font-size: 24px;
  max-width: 80%;
  text-align: center;
`;

export const Amount = styled.h1`
  color: ${primary[100]};
  font-size: 48px;
  padding: 8px;
`;
