import React from 'react'
import { Button } from '../ui/button'

const LandingPage = () => {
  return (
   <section className='h-screen w-full backgroundImage relative'>
        <div className='px-5 py-10'>
            <div className='py-[100px] max-w-[700px]'>
                <div className=' my-6 rounded-full border border-white/80 py-2 px-2 font-white inline-block text-white font-semibold'>
                    A Web3 Healthcare patient data management system
                </div>
                <h1 className='text-7xl text-white font-bold tracking-wide'>Take Control of <br/>
                Your Medical Record</h1>
                <p className='mt-6 text-white font-bold text-2xl'>
                Manage and share your health data securely 
                with <br/> blockchain technology ⛓️
                </p>

                <div className='flex flex-row space-x-5 mt-5'>
                    <Button className='bg-white text-black hover:bg-gray-400/45 ease-in-out transition-all duration-300'>Learn More About Us</Button>
                    <Button className='bg-white text-black hover:bg-gray-400/45 ease-in-out transition-all duration-300'>Log In To Your Account</Button>
                </div>
            </div>
        
        </div>
   </section>
  )
}

export default LandingPage
