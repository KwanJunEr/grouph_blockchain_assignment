import React from 'react'
import { redirect } from "next/navigation";
import { isLoggedIn } from '@/actions/login';

const Dashboard = async () => {
    if (!(await isLoggedIn())) {
        redirect("/");
      }
  return (
    <div className='px-5 py-5'>
        
        <div className='flex flex-row gap-5'>
            {/*Left Column*/}
            <div className='min-w-[900px] bg-red-50'>
                dssdfsdf
            </div>

              {/*Left Column*/}
            <div className='min-w-[570px] bg-red-400'>
sdfsdfsdsd
            </div>
        </div>
    </div>
  )
}

export default Dashboard
