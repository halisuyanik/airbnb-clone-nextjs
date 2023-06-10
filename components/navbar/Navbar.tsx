'use client'
import React from 'react'
import Container from '../container/Container'
import Search from './search/Search'
import UserMenu from './usermenu/UserMenu'
import { UserViewModel } from '@/types/UserViewModel'
import Categories from './categories/Categories'
import Logo from './logo/Logo'

interface NavbarProps{
  currentUser?:UserViewModel | null;
}

const Navbar:React.FC<NavbarProps>=({currentUser})=> (
  <div className="fixed w-full bg-white z-10 shadow-sm">
    <div className='py-4 border-b-[1px]'>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo></Logo>
          <Search></Search>
          <UserMenu currentUser={currentUser}></UserMenu>
        </div>
      </Container>
    </div>
    <Categories></Categories>
  </div>
)

export default Navbar