'use client'
import React, { useState, useCallback } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../avatar/Avatar'
import MenuItem from '../menuitem/MenuItem';
import useSignupModal from '@/hooks/useSignupModal';
import useSigninModal from '@/hooks/useSigninModal';
import { signOut } from 'next-auth/react';
import { UserViewModel } from '@/types/UserViewModel';
import useRentModal from '@/hooks/useRentModal';

interface UserMenuProps{
  currentUser?:UserViewModel | null;
}

const UserMenu:React.FC<UserMenuProps>=({currentUser}) => {
  const signupModal=useSignupModal();
  const signinModal=useSigninModal();
  const [isOpen, setIsOpen]=useState(false);
  const rentModal=useRentModal();
  const onRent=useCallback(()=>{
    if(!currentUser){
      return signinModal.onOpen();
    }
    rentModal.onOpen();
  },[currentUser, signinModal,rentModal])
  const toggleOpen=useCallback(()=>{
    setIsOpen((value=>!value));
  },[])
  return (
    <div className='relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={rentModal.onOpen} className='hidden md:block text-sm font-semiold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
          <AiOutlineMenu></AiOutlineMenu>
          <div className='hidden md:block'>
          <Avatar src={currentUser?.image}></Avatar>
        </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl overflow-hidden shadow-md w-[40vw] md:w-3/4 bg-white right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ?(
              <>
                <MenuItem onClick={()=>{}} label="My trips"></MenuItem>
                <MenuItem onClick={()=>{}} label="My favorites"></MenuItem>
                <MenuItem onClick={()=>{}} label="My reservations"></MenuItem>
                <MenuItem onClick={()=>{}} label="My properties"></MenuItem>
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home"></MenuItem>
                <hr></hr>
                <MenuItem onClick={()=>signOut()} label="Logout"></MenuItem>
              </>
            ):(
              <>
                <MenuItem onClick={signinModal.onOpen} label="Login"></MenuItem>
                <MenuItem onClick={signupModal.onOpen} label="Sign up"></MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu