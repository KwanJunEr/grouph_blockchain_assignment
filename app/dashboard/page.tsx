"use client";
import { useState, useEffect } from "react";
import React from "react";
import { ethers } from "ethers";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/actions/login";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HealthInsightsCard from "@/components/HealthInsightsCard";
import ManageAccessCard from "@/components/ManageAccessCard";
import { Calendar } from "@/components/Calendar";
import DetailItem from "@/components/DetailItem";
import ListDetailItem from "@/components/ListDetailItem";
import ProfileModalForm from "@/components/EditProfileModal";
import { getPatientGeneralInfo } from "@/lib/patientethers"; // Import your Ethereum functions

const Dashboard = () => {
  // if (!(await isLoggedIn())) {
  //   redirect("/");
  // }
  const [open, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Default data to show while loading
  const [data, setData] = useState({
    name: "Loading...",
    age: "Loading...",
    gender: "Loading...",
    bloodType: "Loading...",
    houseAddress: "Loading...",
    height: "Loading...",
    weight: "Loading...",
    email: "Loading...",
    phone: "Loading...",
    chronicConditions: ["Loading..."],
    allergies: ["Loading..."],
    medications: ["Loading..."],
    lastCheckup: "Loading...",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        // Get user address from localStorage (same approach as your friend's code)
        const userAddress = localStorage.getItem("userAddress");
        
        if (!userAddress) {
          throw new Error("User crypto wallet address not found in localStorage");
        }
        
        // Check if MetaMask is installed and get accounts
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed!");
        }
        
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        // Initialize the provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get document hash from the blockchain
        const documentHash = await getPatientGeneralInfo(provider, userAddress);
        console.log("Document hash retrieved from blockchain:", documentHash);
        
        if (!documentHash) {
          throw new Error("No patient profile found for this address");
        }
        
        // Fetch the patient data from MongoDB using the document hash
        const response = await fetch(`/api/profile?hash=${documentHash}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Patient data retrieved:", result);
        
        // Update the UI with patient data
        setData(result.data || result);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        
        // Option 2: Type assertion
        setError((err as Error).message || "Failed to fetch patient data");
        
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <main className="px-5 py-5 min-h-screen">
      {loading && (
        <div className="text-center py-4 font-bold">Loading patient data...</div>
      )}
      
      {error && (
        <div className="text-center py-4 text-red-600">
          Error: {error}
          <div className="mt-2">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-5">
        {/*Left Column*/}
        <div className="min-w-[900px] px-2 py-2">
          <div className="flex flex-col">
            {/*Introduction*/}
            <div className="flex flex-row justify-between py-2">
              <h1 className="text-2xl font-extrabold tracking-tighter">
                Welcome, {data.name} !
              </h1>
              <Button onClick={() => setOpenModal(true)}>Edit Profile</Button>
              <ProfileModalForm open={open} setOpen={setOpenModal} />
            </div>
            <hr className="my-2 h-3 font-bold w-full" />
            {/*User Profile*/}
            <div className="flex flex-row bg-white shadow-md py-5 px-3 rounded-md">
              {/*User Picture*/}
              <div className="">
                <Image
                  src={"/userprofilepicture.png"}
                  alt=""
                  width={300}
                  height={500}
                  className="border border-black rounded-md h-full"
                />
              </div>
              {/*User Details*/}
              <div className="grid grid-cols-2 gap-[100px] ml-6">
                {/*Basic Details*/}
                <div className="flex flex-col space-y-2 min-w-[150px]">
                  <DetailItem label={"Name"} value={data.name} />
                  <DetailItem label={"Age"} value={data.age} />
                  <DetailItem label={"Gender"} value={data.gender} />
                  <DetailItem label={"Phone Number"} value={data.phone} />
                  <DetailItem label={"Email Address"} value={data.email} />
                  <DetailItem label={"House Address"} value={data.houseAddress} />
                  <DetailItem label={"Height"} value={data.height} />
                  <DetailItem label={"Weight"} value={data.weight} />
                </div>
                {/*Medical Details*/}
                <div className="flex flex-col space-y-2 min-w-[150px]">
                  <DetailItem label={"Blood Type"} value={data.bloodType} />
                  <ListDetailItem label={"Chronic Conditions"} values={data.chronicConditions} />
                  <ListDetailItem label={"Allergies"} values={data.allergies} />
                  <ListDetailItem label={"Medication"} values={data.medications} />
                  <DetailItem label={"Last Checkup"} value={data.lastCheckup || "Not available"} />
                </div>
              </div>
            </div>

            {/*Calendar*/}
            <div className="my-5">
              <h1 className="my-2 font-bold text-xl">My Calendar</h1>
              <hr className="my-2" />
              <Calendar />
            </div>
          </div>
        </div>

        {/*Right Column*/}
        <div className="min-w-[570px] px-3 py-3">
          <div className="flex flex-col space-y-6 justify-center items-center">
            {/*Health Insights Card*/}
            <HealthInsightsCard />
            <ManageAccessCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;