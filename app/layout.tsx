import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Nunito } from '@next/font/google' 
import ClientOnly from '@/components/ClientOnly'
import SignupModal from '@/components/modals/SignupModal'
import ToasterProvider from '@/providers/ToastProvider'
import SigninModal from '@/components/modals/SigninModal'
import getCurrentUser from '@/utils/getCurrentUser'

const font =Nunito({
  subsets:["latin"]
})

export const metadata={
  title:'Airbnb',
  description:'Airbnb clone'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider></ToasterProvider>
          <Navbar currentUser={currentUser} />
          <SigninModal></SigninModal>
          <SignupModal></SignupModal>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
