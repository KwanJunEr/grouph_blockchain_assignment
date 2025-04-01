"use client";
import React, { useState } from 'react'
import { Table } from "antd";
import { Button } from '@/components/ui/button';

const Permission = () => {
    const [access, setAccess] = useState(false);
    const columns = [
        {
          title: 'Doctor',
          dataIndex: 'doctor',
          key: 'doctor',
        },
        {
          title: 'Hospital',
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: 'Permission Status',
          dataIndex: 'permissionstatus',
          key: 'permissionstatus',
        },
        {
            title: 'Data Access',
            dataIndex: 'dataaccess',
            key: 'dataaccess',
        },
        {
            title: 'Last Granted Date',
            dataIndex: 'lastgranteddate',
            key: 'lastgranteddate',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
              <Button>{access ? "Revoke Access" : "Grant Access"}</Button>
            ),
        }
      ];
  return (
    <main className='px-5 py-5 min-h-screen'>
        <div className='flex flex-col'>
            <div className='py-2'>
                <h1 className='text-2xl font-bold'>Permission Log</h1>
                <p className='text-gray-600 py-2'>Manage who has access to your data</p>
            </div>
            <hr className='h-2 w-full'/>
            <div className='mt-10'>
                <Table columns={columns}/>
            </div>
        </div>
    </main>
  )
}

export default Permission
