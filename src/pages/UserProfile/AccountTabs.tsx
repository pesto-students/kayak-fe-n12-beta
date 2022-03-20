import { Button, ButtonGroup } from '@mui/material';
import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function AccountsTabs() {
  const filterButtons = [
    {
      value: 'profile',
      text: 'Profile'
    },
    {
      value: 'events',
      text: 'My Events'
    },
    {
      value: 'portfolio',
      text: 'My Portfolio'
    }
  ];

  const { type } = useParams();
  return (
    <ButtonGroup sx={{ marginBottom: '48px' }}>
      {filterButtons.map((filterButton) => (
        <Link key={filterButton.value} to={`/accounts/${filterButton.value}`}>
          <Button
            sx={{
              borderRadius: '0',
              boxShadow: 'none',
              color: type === filterButton.value ? '#fff' : 'inherit'
            }}
            variant="contained"
            color={type === filterButton.value ? 'primary' : 'secondary'}
            value={filterButton.value}>
            {filterButton.text}
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  );
}

export default memo(AccountsTabs);
