import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import landingHero from '../../assets/images/landingHero.jpg';
import HeroImage from '../../material-components/HeroImage';

const LandingPageHeroContent = () => {
  return (
    <Box
      sx={{
        bgcolor: '#67C6B3',
        pt: 10,
        pb: 8
      }}>
      <Container>
        <Grid container>
          <Grid xs={12} sm={6} md={5}>
            <HeroImage src={landingHero} />
          </Grid>
          <Grid mx={4} xs={12} sm={6} md={6}>
            <Typography component="h2" variant="h3" align="left" color="white" gutterBottom>
              Sail through the rough sees, see your idea bloom.
            </Typography>
            <Typography variant="h6" align="left" color="white" paragraph>
              Oragnize events, we will help you reach a great community. Endeavour into a new era of
              fund raising.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="flext-start">
              <Link to="/events/ongoing">
                <Button variant="contained" color="secondary">
                  Get Started
                </Button>
              </Link>
              <Button variant="outlined" color="secondary">
                Learn More
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageHeroContent;
