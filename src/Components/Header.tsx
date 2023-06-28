'use client'
import '../app/globals.css'
import { rajdhani } from "../app/layout"

import { Avatar, Container,Toolbar, Typography } from "@material-ui/core"
import { Dropdown } from './Dropdown'
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from 'react'
import Lista  from './Lista'

export default function Header(){
    const [open,setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(true);
  };

  function closeMenu(){
    setOpen(false)
  }
  
    return(    
        <div className="leite bg-gradient-to-b from-teal-900 to-emerald-950 h-28 flex justify-between items-center md:p-6 p-1 " >
           
                <div className=' md:hidden text-white'  >
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="menu"
                    className='md:flex text-white' 
                    onClick={toggleMenu}
                >
                    <MenuIcon className='md:none text-white'  />
                </IconButton>
                    {open && ( 
                        <div className='bg-zinc-950 bg-opacity-90  w-full fixed top-0 left-0 z-0'
                        onClick={closeMenu} >
                        <Lista />
                        </div>)}
                </div>
          
            <h1 className={`${rajdhani.className} font-semibold text-white md:text-5xl text-2xl`} >Sistema mais leite</h1>
            <div className='flex'>
                <Avatar alt="Perfil" src="" className=''/>
                <Dropdown />
            </div>
        </div>
    )
}

