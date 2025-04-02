"use client";
import React, { useState } from "react";
import { Table } from "antd";
import { Button } from "@/components/ui/button";

const MedicalHistory = () => {
    const [data, setData] = useState(false);
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
            title: 'Short Description',
            dataIndex: 'shortdescription',
            key: 'shortdescription',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
              <Button className="bg-purple-500 text-white font-bold">View Details</Button>
            ),
        }
      ];
  return (
    <main className="min-h-screen">
      <div className="px-5 py-5 flex flex-col">
        <div className="my-2">
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-gray-600 py-2">View and Manage your Medical Records </p>
        </div>
        <hr className="my-1 w-full h-6 font-bold"/>
        <div className="mt-2">
            <Table  columns={columns}/>
        </div>
      </div>
    </main>
  );
};

export default MedicalHistory;
