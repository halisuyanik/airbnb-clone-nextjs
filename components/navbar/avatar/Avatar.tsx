'use client'

import Image from "next/image"
import AvatarPic from '../../../public/Avatar-Placeholder-400x400-1.jpg'

interface AvatarProps{
  src:string | null | undefined
}

const Avatar:React.FC<AvatarProps>=({src})=> {
  return (
    <Image alt="avatar" src={src ||AvatarPic} className="rounded-full" width={30} height={30}></Image>
  )
}

export default Avatar