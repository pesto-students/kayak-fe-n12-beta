import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Grid, Typography } from '@mui/material';
import { APP_NAME } from '../../constants/app-info';
import logo from '../../logo.png';
import FooterHeading from '../../material-components/FooterHeading';
import Copyright from './Copyright';
import FooterLink from './FooterLink';
import { aboutMenuList, moreMenuList, supportMenuList } from './FooterMenuList';

const Footer = () => {
  return (
    <Box component="div" px={{ backgroundColor: 'black', xs: 2, sm: 3, lg: 4 }}>
      <Box pt={6} pb={{ md: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <Box mb={2} component={'img'} mt={-3} width={60} src={logo} alt={APP_NAME} />
            <Typography marginBottom={2} variant="h4" component="h4" color="primary">
              {APP_NAME}
            </Typography>
            <Typography marginBottom={2} variant="subtitle2" component="h6" color="secondary">
              Nurturing community of idea curators and Investors with transparency, integrity and
              loyalty.
            </Typography>
            {/* Social Media Connect */}
            <FacebookIcon sx={{ marginRight: '8px' }} color="primary" fontSize="large" />
            <InstagramIcon sx={{ marginRight: '8px' }} color="primary" fontSize="large" />
            <TwitterIcon color="primary" fontSize="large" />
          </Grid>

          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={6} sm={4}>
                <FooterHeading heading="About" />
                <FooterLink menuList={aboutMenuList} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FooterHeading heading="Support" />
                <FooterLink menuList={supportMenuList} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FooterHeading heading="More" />
                <FooterLink menuList={moreMenuList} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={3}>
            <FooterHeading heading="Contact Us" />
            <Typography marginBottom={2} variant="subtitle2" component="h6" color="secondary">
              Let&apos;s start a new endeavour.
            </Typography>
            <Typography
              display={'flex'}
              alignItems={'center'}
              textAlign="left"
              marginBottom={2}
              variant="subtitle2"
              component="h6"
              color="secondary">
              <LocalPhoneIcon sx={{ marginRight: 1 }} color="primary" /> +91-8149922228
            </Typography>
            <Typography
              display={'flex'}
              alignItems={'center'}
              variant="subtitle2"
              component="h6"
              textAlign="left"
              color="secondary">
              <EmailIcon sx={{ marginRight: 1 }} color="primary" /> kayak.webapp@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Copyright />
    </Box>
  );
};

export default Footer;
