import { Divider, Typography } from '@mui/material';
import React from 'react';

interface IHeading {
  heading: string;
}
export default function Heading({ heading }: IHeading) {
  return (
    <Divider textAlign="left">
      <Typography sx={{ py: 2, fontWeight: 500 }} component="h4" variant="h5" align="left">
        {heading}
      </Typography>
    </Divider>
  );
}
