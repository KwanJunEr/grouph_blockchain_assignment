import { NextResponse } from "next/server";
import MedicalRecord from "../../../models/patientRecord";


export async function POST(req) {
    try {
    
    // Get form data from the request body
    const {
        userAddress,
        documentHash,
        visitedDate,
        type,
        hospital,
        doctorAssigned,
        diagnosis,
        procedure,
        treatmentPlans,
        medicinePrescription,
        labResults,
        billingAmount,
        notes,
        surgeryReport,
      } = await req.json();
  
      console.log("Received data:", {
        userAddress,
        documentHash,
        visitedDate,
        type,
        hospital,
        doctorAssigned,
        diagnosis,
        procedure,
        treatmentPlans,
        medicinePrescription,
        labResults,
        billingAmount,
        notes,
        surgeryReport,
      });
    
      const newMedicalRecord = {
        userAddress,
        documentHash,
        visitedDate,
        type,
        hospital,
        doctorAssigned,
        diagnosis,
        procedure,
        treatmentPlans,
        medicinePrescription,
        labResults,
        billingAmount,
        notes,
        surgeryReport,
      };
      console.log(newMedicalRecord);
  
      // Insert into the 'patientData' collection
      await MedicalRecord.create(newMedicalRecord);
  
      // Respond with the saved profile data (including MongoDB ID)
      return NextResponse.json({ message: "Medical Record Data Created" }, { status: 201 });
    } catch (error) {
      console.error("Error:", error);
      // Catch any errors and send a response with error message
      return NextResponse.json({ message: "No Data Created", error: error.message }, { status: 500 });
    }
  }