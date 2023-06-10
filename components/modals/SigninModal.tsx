"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSigninModal from "@/hooks/useSigninModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from 'react-hot-toast';
import Button from "../buttons/Button";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation";
import useSignupModal from "@/hooks/useSignupModal";

const SigninModal = () => {
  const signinModal = useSigninModal();
  const signupModal=useSignupModal();
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials',{
        ...data,
        redirect:false,
    })
    .then((response)=>{
        setIsLoading(false);
        if(response?.ok){
            toast.success('Sign in successfully');
            router.refresh();
            signinModal.onClose();
        }
        if(response?.error){
            toast.error(response.error);
        }
    })
  };
  
  const toggleModal=useCallback(()=>{
    signinModal.onClose();
    signupModal.onOpen();
  },[signupModal, signinModal])

  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Sign in to your account!"></Heading>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required></Input>
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required></Input>
    </div>
  )

  const footerContent=(
    <div className="flex flex-col gap-4 mt-3">
      <hr></hr>
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=>signIn('google')}></Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>
            First time using Arinbnb?
          </div>
          <div onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={signinModal.isOpen}
      title="Sign in"
      actionLabel="Continue"
      onClose={signinModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default SigninModal;
