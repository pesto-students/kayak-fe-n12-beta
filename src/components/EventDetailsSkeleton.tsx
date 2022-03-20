import { Box, Container, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';

const EventDetailsSkeleton = () => {
  return (
    <Fragment>
      <Box
        sx={{
          pt: 8,
          pb: 4
        }}>
        <Container>
          <Grid container>
            <Grid item sx={{ pb: 4 }} xs={12} sm={6} md={6}>
              <Skeleton sx={{ width: '100%' }} variant="rectangular" height={360} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ padding: '0 16px' }}>
              <Box display={'flex'} alignItems={'flex-end'} mb={3}>
                <Skeleton sx={{ mr: 1 }} height={60} variant="text" width={120} />
                <Skeleton sx={{ mb: 1 }} variant="text" width={100} />
              </Box>
              <Skeleton variant="text" width={280} />
              <Box mb={2}>
                <Skeleton variant="text" width={180} />
                <Skeleton variant="text" width={120} />
              </Box>

              <Stack direction="row" justifyContent="space-between">
                <Box mb={4}>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={140} />
                </Box>
                <Box mb={4}>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={140} />
                </Box>
              </Stack>
              <Divider sx={{ mb: 4 }} />
              <Skeleton variant="text" width={120} />
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="space-between">
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={120} height={58} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Event Story  */}
      <Container>
        <Divider sx={{ mt: 2 }} textAlign="left">
          <Typography
            color={'primary'}
            fontWeight={'600'}
            sx={{ py: 2 }}
            component="h4"
            variant="h4"
            align="left">
            Event Story
          </Typography>
        </Divider>
        <Skeleton sx={{ width: '88%' }} variant="text" height={68} />
        <Skeleton sx={{ width: '68%' }} variant="text" height={18} />
        <Skeleton sx={{ width: '48%' }} variant="text" height={18} />
        <Skeleton sx={{ width: '88%' }} variant="text" height={30} />
        <Skeleton sx={{ width: '58%' }} variant="text" height={18} />
        <Skeleton sx={{ width: '88%' }} variant="text" height={18} />
        <Skeleton sx={{ width: '50%' }} variant="text" height={200} />
        <Skeleton sx={{ width: '88%' }} variant="text" height={18} />
        <Skeleton sx={{ width: '88%' }} variant="text" height={24} />
        <Skeleton sx={{ width: '88%' }} variant="text" height={18} />
      </Container>
    </Fragment>
  );
};

export default EventDetailsSkeleton;
