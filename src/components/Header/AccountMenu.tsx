import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { Box, IconButton, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { menuItem } from './constants';
import { Title } from './styles';

interface IAccountMenuProps {
  handleLogout: () => void;
}

function AccountMenu({ handleLogout }: IAccountMenuProps) {
  const handleMenuItemClick = (type: string) => {
    switch (type) {
      case 'logout': {
        handleLogout();
        break;
      }
      default:
        return;
    }
  };
  return (
    <Menu
      direction="center"
      handler={
        <Box
          sx={{ borderRadius: '4px', zIndex: 2000 }}
          component={IconButton}
          ml={2}
          p={1.25}
          bgcolor="grey.100">
          <PersonOutline />
          <Title>Account</Title>
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </Box>
      }>
      {menuItem.map((item: any) => {
        if (item.href) {
          return (
            <Link key={item.value} to={item.href}>
              <MenuItem sx={{ minWidth: '124px' }} key={item}>
                {item.label}
              </MenuItem>
            </Link>
          );
        }
        return (
          <MenuItem
            onClick={() => {
              handleMenuItemClick(item.value);
            }}
            sx={{ minWidth: '124px' }}
            key={item}>
            {item.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export default AccountMenu;
