"use client";
import { ethers } from "ethers";
import {getVaccineProfileFromChain} from "@/lib/VaccineRecordInteract"
import VaccineForm from "@/components/AddVaccinationRecordModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, SyringeIcon, StethoscopeIcon, FileTextIcon } from "lucide-react"

export default function VaccinationRecords() {
  const [showModal, setShowModal] = useState(false);
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
        const hashes = await getVaccineProfileFromChain(provider, userAddress);
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
              const response = await fetch(`/api/vaccination?documentHash=${hash}`);
              console.log("Response");
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
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



  // const openModal = (vaccine) => {
  //   setSelectedVaccine(vaccine);
  //   setShowModal(true);
  // };

  return (
    <div className="px-5 py-5 min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vaccination Records</h1>
          <p className="text-gray-600">
            View and manage your vaccination history.
          </p>
        </div>
        <div>
          <Button variant="default" onClick={() => setShowModal(true)}>
            Record Vaccination
          </Button>
          <VaccineForm open={showModal} setOpen={setShowModal} />
        </div>
      </div>
      <hr className="h-4 font-bold my-4"/>
      <div className="my-4 flex gap-4 items-center">
      {listofdata.length === 0 ? (
          <div>No vaccination records available.</div>
        ) : (
          listofdata.map((item, index) => {
            return (
              <Card key={index} className="flex-1 min-w-[300px] max-w-[400px] hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.name || "Unknown"}</CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  </div>
                  <CardDescription>Vaccine Record #{index + 1}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <SyringeIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Vaccine:</span>
                  <span className="text-muted-foreground">{item.vaccineName || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Date:</span>
                  <span className="text-muted-foreground">{item.date || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Location:</span>
                  <span className="text-muted-foreground">{item.location || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StethoscopeIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Doctor:</span>
                  <span className="text-muted-foreground">{item.administeringDoctor || "N/A"}</span>
                </div>
               
                  <div className="flex items-start gap-2">
                    <FileTextIcon className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <span className="font-medium">Notes:</span>
                      <p className="text-muted-foreground text-sm mt-1">{item.notes}</p>
                    </div>
                  </div>
                
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-xs text-muted-foreground truncate w-full">Hash: {item.documentHash}...</p>
              </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
