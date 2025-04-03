"use client";
import React, { useState } from "react";
import { Table } from "antd";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MedicalRecordModal from "@/components/AddMedicalHistory";

const MedicalHistory = () => {
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: "Visited Date",
      dataIndex: "visitedDate",
      key: "visitedDate",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Doctor Assigned",
      dataIndex: "doctorAssigned",
      key: "doctorAssigned",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Procedure",
      dataIndex: "procedure",
      key: "procedure",
    },
    {
      title: "Treatment Plans",
      dataIndex: "treatmentPlans",
      key: "treatmentPlans",
    },
    {
      title: "Medicine Prescription",
      dataIndex: "medicinePrescription",
      key: "medicinePrescription",
    },
    {
      title: "Lab Results",
      dataIndex: "labResults",
      key: "labResults",
    },
    {
      title: "Surgery Report",
      dataIndex: "surgeryReport",
      key: "surgeryReport",
    },
    {
      title: "Billing Amount",
      dataIndex: "billingAmount",
      key: "billingAmount",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];
  
  return (
    <main className="min-h-screen">
      <div className="px-5 py-5 flex flex-col">
        <div className="my-2 flex flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold">Medical Records</h1>
            <p className="text-gray-600 py-2">
              View and Manage your Medical Records{" "}
            </p>
          </div>
          <div>
            <Button className="gap-2" onClick={()=>{setOpen(true)}}>
              <Plus className="h-4 w-4" />
              Add Medical Record
            </Button>
            <MedicalRecordModal open = {open} setOpen = {setOpen}/>
          </div>
        </div>
        <hr className="my-1 w-full h-6 font-bold" />
        <div className="mt-2">
          <Table columns={columns} />
        </div>
      </div>
    </main>
  );
};

export default MedicalHistory;
