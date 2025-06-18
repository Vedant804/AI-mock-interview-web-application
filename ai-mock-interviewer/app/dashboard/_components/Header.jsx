"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <img src={'/logo.svg'} width={50} height={30} alt="logo"/>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&&'text-primary font-bold'}
            `}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how-it-works'&&'text-primary font-bold'}
            `}>
              <Link href="/dashboard/how-it-works">How it works?</Link>
            </li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header