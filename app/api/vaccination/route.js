import { NextResponse } from "next/server";
import VaccineRecord from "../../../models/vaccinationRecord";


export async function POST(req) {
    try {
    
    // Get form data from the request body
    const {
        userAddress,
        documentHash,
        name,
        date,
        vaccineName,
        location,
        administeringDoctor,
        notes,
      } = await req.json();
  
      console.log("Received data:", {
        userAddress,
        documentHash,
        name,
        date,
        vaccineName,
        location,
        administeringDoctor,
        notes,
      });
  
      const newVaccineRecord = {
        userAddress,
        documentHash,
        name,
        date,
        vaccineName,
        location,
        administeringDoctor,
        notes,
      };
  
      console.log(newVaccineRecord);
  
      // Insert into the 'patientData' collection
      await VaccineRecord.create(newVaccineRecord);
  
      // Respond with the saved profile data (including MongoDB ID)
      return NextResponse.json({ message: "Medical Record Data Created" }, { status: 201 });
    } catch (error) {
      console.error("Error:", error);
      // Catch any errors and send a response with error message
      return NextResponse.json({ message: "No Data Created", error: error.message }, { status: 500 });
    }
  }