import { Skeleton } from '@mui/material';
import React, { memo } from 'react';
import { Container, EventDetailWrapper } from './styles';

function SearchResultSkeleton() {
  return (
    <Container>
      <Skeleton variant="rectangular" width={114} height={84} />
      <EventDetailWrapper>
        <Skeleton width={140} variant="text" />
        <Skeleton width={100} variant="text" />
        <Skeleton width={70} variant="text" />
      </EventDetailWrapper>
    </Container>
  );
}

export default memo(SearchResultSkeleton);
