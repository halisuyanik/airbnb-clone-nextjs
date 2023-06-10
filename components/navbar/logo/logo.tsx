'use client'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Airbnblogo from "../../../public/Airbnb_Logo_Bélo.svg.png";
export default function Logo() {
  const router=useRouter();
  return (
    <Image onClick={()=>router.push('/')} alt="logo" className='hidden md:block cursor-pointer' height={100} width={100} src={Airbnblogo}/>
  )
}
