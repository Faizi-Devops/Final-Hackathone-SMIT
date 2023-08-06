import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Slider from '@/components/Slide'
import Login from './User'
import Register from './Register'
import Slide from '@/components/Slide'
import Landing from './Landing'
import AdminNav from '@/components/AdminNav'
import Sidenavbar from '@/components/Sidenavbar'
import UserNav from '@/components/UserNav'
import UserSideNav from '@/components/UserSideNav'
import Complaint_History from './User/Complaint_History'
import Register_Complaint from './User/Register_Complaint'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <Landing />
  {/* <Complaint_History /> */}
  {/* <Register_Complaint /> */}
  

      
    </>
  )
}
