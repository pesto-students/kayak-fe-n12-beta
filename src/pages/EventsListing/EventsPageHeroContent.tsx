import { Box, Container, Typography } from '@mui/material';

const EventsPageHeroContent = () => {
  return (
    <Box
      sx={{
        bgcolor: '#67C6B3',
        pt: 10,
        pb: 8
      }}>
      <Container>
        <Typography fontWeight={'500'} variant="h4" align="left" color="white" paragraph>
          Events List
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div" color="white">
          Have a look at the exciting project people are investing. Reach out the event creators to
          know more.
        </Typography>
      </Container>
    </Box>
  );
};

export default EventsPageHeroContent;
