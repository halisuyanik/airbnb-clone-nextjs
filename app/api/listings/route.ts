import {NextResponse} from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/utils/getCurrentUser';

export async function POST(
    request:Request
){
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body=await request.json();
    const{title, imageSrc, category, roomCount, bathroomCount, guestCount, price, location, description}=body;
    Object.keys(body).forEach((value:any)=>{
        if(!body[value]){
            NextResponse.error();
        }
    })
    
    const listing=await prisma.listing.create({
        data:{
            title,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            price:parseInt(price,10),
            locationValue:location.value,
            description,
            userId:currentUser.id
        }
    })

    return NextResponse.json(listing);
}