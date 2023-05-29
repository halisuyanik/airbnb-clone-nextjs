'use client'
import React from 'react'
import Container from '../container/Container'
import Logo from './logo/logo'
import Search from './search/Search'
import UserMenu from './usermenu/UserMenu'

export default function Navbar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo></Logo>
                    <Search></Search>
                    <UserMenu></UserMenu>
                </div>
            </Container>
        </div>
    </div>
  )
}
