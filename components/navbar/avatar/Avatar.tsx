'use client'

import Image from "next/image"
import AvatarPic from '../../../public/Avatar-Placeholder-400x400-1.jpg'

function Avatar() {
  return (
    <Image alt="avatar" src={AvatarPic} className="rounded-full" width={30} height={30}></Image>
  )
}

export default Avatar