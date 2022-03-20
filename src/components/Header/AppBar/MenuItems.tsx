import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

const menuList = [
  {
    menuLink: 'home',
    menuText: 'Home'
  },
  {
    menuLink: '/events/ongoing',
    menuText: 'Discover'
  },
  {
    menuLink: 'create-event',
    menuText: 'Start an Event'
  },
  {
    menuLink: 'faqs',
    menuText: "FAQ's"
  }
];

const MenuItems = ({ handleCloseNavMenu }: Props) => {
  return (
    <>
      {menuList.map((menu) => (
        <MenuItem key={menu.menuLink} onClick={handleCloseNavMenu}>
          <Link to={menu.menuLink}>
            <Typography color="primary" textAlign="center">
              {menu.menuText}
            </Typography>
          </Link>
        </MenuItem>
      ))}
    </>
  );
};

export default MenuItems;
