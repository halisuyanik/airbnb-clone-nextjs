'use client'

import { UserViewModel } from "@/types/UserViewModel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface HeartButtonProps{
    listingId:string;
    currentUser?:UserViewModel | null;
}

const HeartButton:React.FC<HeartButtonProps> = ({listingId, currentUser}) => {
    const hasFavorited=false;

    const toggleFavorite=()=>{
        
    }


    return ( 
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"></AiOutlineHeart>
            <AiFillHeart size={24} className={hasFavorited?'fill-rose-500':'fill-neutral-500/70'}></AiFillHeart>
        </div>
     );
}
 
export default HeartButton;