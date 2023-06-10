"use client";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSignupModal from "@/hooks/useSignupModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from 'react-hot-toast';
import Button from "../buttons/Button";
import { signIn } from "next-auth/react"
import useSigninModal from "@/hooks/useSigninModal";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const signinModal=useSigninModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/signup", data)
      .then(() => {
        signupModal.onClose();
      })
      .catch((error) => {
        console.log(error)
        console.log(data)
        toast.error("Oops. something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleModal=useCallback(()=>{
    signupModal.onClose();
    signinModal.onOpen();
  },[signinModal, signupModal])

  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create and account!"></Heading>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required></Input>
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required></Input>
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
            Already have an account?
          </div>
          <div onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
            Sign in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={signupModal.isOpen}
      title="Signup"
      actionLabel="Continue"
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default SignupModal;
