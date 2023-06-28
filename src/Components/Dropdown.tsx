'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import '../app/globals.css'

export function Dropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className='text-white md:w-1/4 md:p-0'
        >
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} className='hover:text-emerald-700 hover:text-lg transition duration-300 ease-in-out font-semibold'>Perfil</MenuItem>
          <MenuItem onClick={handleClose} className='hover:text-emerald-700 hover:text-lg transition duration-300 ease-in-out font-semibold'>Configurações</MenuItem>
          <MenuItem onClick={handleClose} className='hover:text-emerald-700 hover:text-lg transition duration-300 ease-in-out font-semibold'>Sair</MenuItem>
        </Menu>
      </div>
    );
  }