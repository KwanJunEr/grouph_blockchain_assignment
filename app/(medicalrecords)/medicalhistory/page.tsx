"use client";
import { ethers } from "ethers";
import { getMedicalRecordFromChain } from "@/lib/MedicalHistoryInteract";
import React, { useState, useEffect} from "react";
import { Table } from "antd";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MedicalRecordModal from "@/components/AddMedicalHistory";

const MedicalHistory = () => {
 
  const [open, setOpen] = useState(false);
  const [listofdata, setListOfData] = useState<any[]>([]); // State for list of data
  const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchRecords = async () => {
        setLoading(true);
        try{
          const userAddress = localStorage.getItem("userAddress");
  
          if (!userAddress) {
            console.error("User crypto wallet address not found in localStorage");
            return;
          }
          // Check if MetaMask is installed and get accounts
          if (!window.ethereum) {
            console.error("MetaMask is not installed!");
            return;
          }
          await window.ethereum.request({ method: "eth_requestAccounts" });
    
          // Fix: Correct provider initialization
          const provider = new ethers.BrowserProvider(window.ethereum);
          const hashes = await getMedicalRecordFromChain(provider, userAddress);
          console.log("The obtained hashes", hashes);
     
          if(hashes.length === 0){
            console.log("No document hashes found.");
            setLoading(false);
            return;
          }
  
          const documentData = await Promise.all(
              hashes.map(async (hash: any) => {
              try {
                console.log(hash)
                const response = await fetch(`/api/medicalrecord?documentHash=${hash}`);
                console.log("Response");
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("ReceivedData",data);
                setListOfData((prevData) => {
                  if (!prevData.some(item => item.documentHash === data.documentHash)) {
                    return [...prevData, data];
                  }
                  return prevData;
                });
            
              } catch (error) {
                console.error("Error fetching document for hash:", hash, error);
              }
            })
          );
          console.log("Fetched Document Data:", listofdata);
    
          
        }catch(error){
          console.log("Can't find anything");
          console.error("Error fetching records:", error);
        }
        finally {
          setLoading(false);
        }
      };
      fetchRecords();
    },[]);




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
          <Table columns={columns} dataSource={listofdata} />
        </div>
      </div>
    </main>
  );
};

export default MedicalHistory;
