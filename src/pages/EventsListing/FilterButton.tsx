import { Button, ButtonGroup } from '@mui/material';
import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function FilterButton() {
  const filterButtons = [
    {
      value: 'ongoing',
      text: 'Ongoing'
    },
    {
      value: 'upcoming',
      text: 'Upcoming'
    },
    {
      value: 'past',
      text: 'Past'
    }
  ];

  const { status } = useParams();
  return (
    <ButtonGroup sx={{ marginBottom: '32px' }}>
      {filterButtons.map((filterButton) => (
        <Link key={filterButton.value} to={`/events/${filterButton.value}`}>
          <Button
            sx={{
              borderRadius: '0',
              boxShadow: 'none',
              color: status === filterButton.value ? '#fff' : 'inherit'
            }}
            variant="contained"
            color={status === filterButton.value ? 'primary' : 'secondary'}
            value={filterButton.value}>
            {filterButton.text}
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  );
}

export default memo(FilterButton);
