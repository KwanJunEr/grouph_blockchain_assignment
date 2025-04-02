"use client";
import { useState,useEffect } from "react";
import React from "react";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/actions/login";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HealthInsightsCard from "@/components/HealthInsightsCard";
import ManageAccessCard from "@/components/ManageAccessCard";
import { Calendar } from "@/components/Calendar";
import DetailItem from "@/components/DetailItem";
import ListDetailItem from "@/components/ListDetailItem";

const Dashboard =  () => {
//   if (!(await isLoggedIn())) {
//     redirect("/");
//   }
  const [open, setOpenModal] = useState(false);
  const [data, setData] = useState({
        name: "Robert Smith",
        age: "42",
        gender: "Male",
        bloodType: "O+",
        houseAddress: "No.8, Rumah Besar",
        height: "5'11\" (180 cm)",
        weight: "175 lbs (79 kg)",
        email: "robert.smith@example.com",
        phone: "(555) 123-4567",
        chronicConditions: ["Type 2 Diabetes", "Hypertension"],
        allergies: ["Penicillin", "Peanuts"],
        medications: ["Metformin 500mg", "Lisinopril 10mg", "Aspirin 81mg"],
        lastCheckup: "March 15, 2025",
    }
  )

  const handleEditProfileOpenModal = ()=>{
    setOpenModal(true);
  }
  return (
    <main className="px-5 py-5 min-h-screen">
      <div className="flex flex-row gap-5">
        {/*Left Column*/}
        <div className="min-w-[900px] px-2 py-2">
          <div className="flex flex-col">
            {/*Introduction*/}
            <div className="flex flex-row justify-between py-2">
              <h1 className="text-2xl font-extrabold tracking-tighter">
                Welcome, {data.name} !
              </h1>
              <Button>Edit Profile</Button>
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
                    <DetailItem label = {"Name"} value={data.name} />
                    <DetailItem label = {"Age"} value={data.age} />
                    <DetailItem label = {"Gender"} value={data.gender} />
                    <DetailItem label = {"Phone Number"} value={data.phone} />
                    <DetailItem label = {"Email Address"} value={data.email} />
                    <DetailItem label = {"House Address"} value={data.houseAddress} />
                    <DetailItem label = {"Height"} value={data.height} />
                    <DetailItem label = {"Weight"} value={data.weight} />
                </div>
                {/*Medical Details*/}
                <div className="flex flex-col space-y-2 min-w-[150px]">
                    <DetailItem label = {"Blood Type"} value={data.bloodType} />
                    <ListDetailItem label={"Chronic Conditions"} values={data.chronicConditions}/>
                    <ListDetailItem label={"Allergies"} values={data.allergies}/>
                    <ListDetailItem label={"Medication"} values={data.medications}/>
                    <DetailItem label = {"Last Checkup"} value={data.lastCheckup} />
                </div>
              </div>
            </div>

            {/*Calendar*/}
            <div className="my-5">
                <h1 className="my-2 font-bold text-xl">My Calendar</h1>
                <hr className="my-2"/>
                <Calendar/>
            </div>
          </div>
        </div>

        {/*Left Column*/}
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
