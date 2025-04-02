"use client";
import React, { useState } from 'react'
import { Table } from "antd";
import { Button } from '@/components/ui/button';
import RevokeAccessModal from '@/components/RevokeAccessModal';
import GrantAccessModal from '@/components/GrantAccessModal';

const Permission = () => {
    const [open, setopenModal] = useState(false);
    const [enableopen, setenableopenModal] = useState(false);
    const handleOpen  = ()=>{
        setopenModal(true);
    }
    const handleGrantAccessModal = ()=>{
      setenableopenModal(true);
    }
    const data = [
        {
          key: '1',
          doctor: 'Dr. John Doe',
          hospital: 'City Hospital',
          permissionstatus: 'Granted',
          dataaccess: 'Full Access',
          lastgranteddate: '2024-08-20',
          access: true, // Custom field to track access status
        },
        {
          key: '2',
          doctor: 'Dr. John Doe',
          hospital: 'City Hospital',
          permissionstatus: 'Granted',
          dataaccess: 'Full Access',
          lastgranteddate: '2024-08-20',
          access: false, // Custom field to track access status
        },
    ]
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
          render: (_: any, record : any) => (
            <Button onClick={record.access ? handleOpen : handleGrantAccessModal}>
              {record.access ? "Revoke Access" : "Grant Access"}
            </Button>
          ),
        },
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
                <Table columns={columns} dataSource={data}/>
                <RevokeAccessModal open = {open} setOpen = {setopenModal}/>
                <GrantAccessModal open = {enableopen} setOpen = {setenableopenModal}/>
            </div>
        </div>
    </main>
  )
}

export default Permission
