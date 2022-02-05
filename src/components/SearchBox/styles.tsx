import styled from '@emotion/styled';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Card } from '@mui/material';
import { styled as MuiStyled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  padding: 16px;
`;

export const Heading = styled.h3`
  font-weight: 600;
  font-size: 16px;
  padding: 8px 32px;
  margin: 0;
`;

export const Image = styled.img`
  height: 84px;
  width: 114px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  color: #2b3445;
`;

export const Title = styled.p`
  color: #2b3445;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  margin-left: 16px;
  margin: 0;
`;

export const FundingAmount = styled.div``;

export const StartDate = styled.div``;

export const EventDetailWrapper = styled(Box)`
  margin-left: 24px;
`;

export const SearchOutlinedIcon = MuiStyled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6
}));

// also used in the GrocerySearchBox component
export const SearchResultCard = MuiStyled(Card)(() => ({
  position: 'absolute',
  top: '100%',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  width: '100%',
  zIndex: 99,
  maxHeight: '70vh',
  overflowY: 'auto',
  borderRadius: '4px'
}));
