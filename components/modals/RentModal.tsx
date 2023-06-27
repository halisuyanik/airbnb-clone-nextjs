"use client";

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "@/mocks/categories";
import CategoryInput from "../inputs/CategoryInput";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading]=useState(false);
  const router=useRouter();

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    if(step!==STEPS.PRICE){
      return goNext();
    }
    setIsLoading(true);
    axios.post('/api/listings', data).then(()=>{
      toast.success('Listing Created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    }).catch(()=>{
      toast.error('Something went wrong.');
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  const goBack = () => {
    setStep((step) => step - 1);
  };

  const goNext = () => {
    setStep((step) => step + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {register, handleSubmit, setValue, watch, formState:{errors}, reset}=useForm<FieldValues>({
    defaultValues:{
        category:'',
        location:null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        imageSrc:'',
        price:1,
        title:'',
        description:'',
    }
  })

  
  const setCustomValue=(id:string, value:any)=>{
    setValue(id, value, {
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true
    });
  }

  const category=watch('category');
  const location=watch('location');
  const guestCount=watch('guestCount');
  const roomCount=watch('roomCount');
  const bathroomCount=watch('bathroomCount');
  const imageSrc=watch('imageSrc');

  const Map=useMemo(()=>dynamic(()=>import('../map/Map'),{
    ssr:false
  }),[location])

  let bodyContent=(
    <div className="flex flex-col gap-8">
        <Heading title="Which of these best describes your place?" subtitle="Pic a category"></Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((value)=>(
                <div className="col-span-1" key={value.label}>
                    <CategoryInput onClick={(category)=>setCustomValue('category', category)} selected={category===value.label} label={value.label} icon={value.icon} />
                </div>
            ))}
        </div>
    </div>
  )

  if(step===STEPS.LOCATION){
    bodyContent=(
        <div className="flex flex-col gap-8">
            <Heading title="Where is your place located?" subtitle="Help guest find you!"/>
            <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}></CountrySelect>
            <Map center={location?.latlng}></Map>
        </div>
    )
  }

  if(step===STEPS.INFO){
    bodyContent=(
        <div className="flex flex-col gap-8">
            <Heading title="Share some basics about your place" subtitle="What amenities do you have?"/>
            <Counter title="Guests" subtitle="How many guests?" value={guestCount} onChange={(value)=>setCustomValue('guestCount', value)}></Counter>
            <hr></hr>
            <Counter title="Rooms" subtitle="How many rooms?" value={roomCount} onChange={(value)=>setCustomValue('roomCount', value)}></Counter>
            <hr></hr>
            <Counter title="Bathrooms" subtitle="How many bathrooms?" value={bathroomCount} onChange={(value)=>setCustomValue('bathroomCount', value)}></Counter>
        </div>
    )
  }

  if(step===STEPS.IMAGES){
    bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!"></Heading>
          <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue('imageSrc', value)}></ImageUpload>
        </div>
    )
  }

  if(step===STEPS.DESCRIPTION){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading title="How would you describe your place?" subtitle="Short and swent works best!"></Heading>
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required></Input>
        <hr></hr>
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required></Input>
      </div>
    )
  }

  if(step===STEPS.PRICE){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night?"></Heading>
        <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required></Input>
      </div>
    )
  }

  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      title="Airbnb on your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : goBack}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
    ></Modal>
  );
};

export default RentModal;
