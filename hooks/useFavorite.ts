import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { UserViewModel } from '@/types/UserViewModel';
import useSigninModal from './useSigninModal';

interface IUseFavorite{
    listingId:string;
    currentUser?:UserViewModel | null;
}

const useFavorite=({listingId, currentUser}:IUseFavorite)=>{
    const router=useRouter();
    const signinModal = useSigninModal();

    const hasFavorited=useMemo(()=>{
        const list =currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId])
    
    const toggleFavorite=useCallback(async (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        if(!currentUser) return signinModal.onOpen();

        try {
            let request;
            if(hasFavorited){
                request=()=>axios.delete(`/api/favorites/${listingId }`);
            }
            else{
                request=()=>axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Added favorite list.');
        }
        catch(error){
            toast.error('Something went wrong.');
        }
    },[currentUser, hasFavorited, listingId, signinModal, router])
    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;