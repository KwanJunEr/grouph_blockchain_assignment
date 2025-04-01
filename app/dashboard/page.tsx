import React from 'react'
import { redirect } from "next/navigation";
import { isLoggedIn } from '@/actions/login';

const Dashboard = async () => {
    if (!(await isLoggedIn())) {
        redirect("/");
      }
  return (
    <div className=''>
    <h1>Logged In Page</h1>
    <p>You are logged in, so you can see this page!</p>
  </div>
  )
}

export default Dashboard
