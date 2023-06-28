import Image from 'next/image'
import { Inter } from '@next/font/google'
import ClientOnly from '@/components/ClientOnly'
import Container from '@/components/container/Container'
import EmptyState from '@/components/EmptyState'
import getListings from '@/utils/getListings'
import ListingCard from '@/components/listings/ListingCard'
import getCurrentUser from '@/utils/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const isEmpty=true;
  const listings=await getListings();
  const currentUser=await getCurrentUser();

  
  if(listings.length===0){
    return(
      <ClientOnly>
        <EmptyState showReset></EmptyState>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing:any)=>{
            return(
              <ListingCard key={listing.id} data={listing}></ListingCard>
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
