import { create } from "zustand"


interface SignupModalProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useSignupModal=create<SignupModalProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useSignupModal;