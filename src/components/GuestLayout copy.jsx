import Nav from './Nav'
import Footer from './Footer'
import SidebarCorp from './SidebarCorp'
import SidebarAdmin from './SidebarAdmin'
import SidebarPartner from './SidebarPartner'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { storageService } from '../services/storage.service'
import Head from 'next/head'
import Image from 'next/image'
import GuestNavBar from './GuestNavBar'
export default function GuestLayout({ children, title, backUrl = '/', hasBackUrl = true, isNativeBack = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
    console.log(open)
  }

  var userString = '';
  if (router.isReady) {
    userString = storageService.get("user")
  }
  var user = {}
  if (userString) {
    user = JSON.parse(userString)
  }


  const handleLogout = async () => {
    storageService.remove("user")
    router.push('/auth/login');
  }
  return (
    <>

      <Head>
        <title>{'Berita::'+process.env.APP_NAME}</title>
        <link rel="shortcut icon" href="/favicon/favicon-16x16.png" />
        
      </Head>
      <main>
        <GuestNavBar isScrollable={false}/>
        <div className='mt-20 bg-slate-100 px-5 mb-5'>
          {children}

        </div>
        <Footer/>
      </main>

    </>
  )
}