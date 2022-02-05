import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface IMenuList {
  menuList: {
    menuLink: string;
    menuText: string;
  }[];
}

function FooterLink({ menuList }: IMenuList) {
  return (
    <>
      {menuList.map((menu) => (
        <MenuItem sx={{ paddingLeft: '0' }} key={menu.menuLink}>
          <Link to={menu.menuLink}>
            <Typography color="secondary" textAlign="left">
              {menu.menuText}
            </Typography>
          </Link>
        </MenuItem>
      ))}
    </>
  );
}

export default FooterLink;
