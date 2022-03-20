import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../../api/userService';
import { APP_NAME } from '../../../constants/app-info';
import UserContext from '../../../context/UserContext';
import logo from '../../../logo.png';
import { primary } from '../../../styles/themeColors';
import SearchBox from '../../SearchBox/SearchBox';
import { useSnackbarContext } from '../../Snackbar/context';
import AccountMenu from '../AccountMenu';
import { StyledAppbar, Title } from '../styles';
import MenuItems from './MenuItems';

const AppBar = () => {
  const { isUserLoggedIn, setUser, setToken, setIsUserLoggedIn } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    UserService.logout();

    showToast(true, 'success', 'User logged out successfully!', 'center');
    navigate('/home');
  };

  useEffect(() => {
    const UserData = UserService.getCurrentUser();
    if (UserData != null) {
      setUser(UserData.data);
      setToken(UserData.token);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <StyledAppbar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            width="48px"
            component={'img'}
            src={logo}
            alt={APP_NAME}
          />

          <Typography
            variant="h6"
            color={primary[900]}
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            {APP_NAME}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              <MenuItems handleCloseNavMenu={handleCloseNavMenu} />
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItems handleCloseNavMenu={handleCloseNavMenu} />
          </Box>

          <Box>
            <SearchBox />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              {!isUserLoggedIn && (
                <Link to="signin">
                  <Box
                    sx={{ borderRadius: '8px' }}
                    component={IconButton}
                    ml={2}
                    p={1.25}
                    bgcolor="grey.100">
                    <Title>Login /Signup</Title>
                  </Box>
                </Link>
              )}
              {isUserLoggedIn && <AccountMenu handleLogout={handleLogOut} />}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppbar>
  );
};

export default AppBar;
