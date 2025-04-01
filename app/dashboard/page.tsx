import React from 'react'
import { redirect } from "next/navigation";
import { isLoggedIn } from '@/actions/login';

const Dashboard = async () => {
    if (!(await isLoggedIn())) {
        redirect("/");
      }
  return (
    <div className='px-5 mt-5 py-5'>
        <div className='flex flex-row gap-5'>
            {/*Left Column*/}
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Dashboard
