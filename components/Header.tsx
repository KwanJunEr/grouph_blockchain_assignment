"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full px-5 py-6 bg-transparent z-50">
      <div className="flex justify-between items-center">
        <div className='flex flex-row space-x-5'>
           <Image src="/Union.png" width={15} height={15} alt="logo" />
           <h2 className='text-xl text-white font-extrabold'>HealthSync</h2>
        </div>
       
        <Button className='bg-white text-black w-[200px] hover:bg-gray-400/45 ease-in-out transition-all duration-300'>Connect Wallet</Button>
      </div>
    </header>
  )
}

export default Header
