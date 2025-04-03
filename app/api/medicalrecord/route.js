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


  
  export async function GET(req){
      try{
          const url = new URL(req.url);
          const documentHash = url.searchParams.get("documentHash");
          if(!documentHash){
              return NextResponse.json({ message: "Document hash is required." }, { status: 400 });
          }
          const record = await MedicalRecord.findOne({ documentHash });
  
          if (!record) {
              return NextResponse.json({ message: "Medical Record not found." }, { status: 404 });
          }
  
          return NextResponse.json(record, { status: 200 });
      }catch(error){
          console.error("Error fetching data:", error);
      // Respond with error message if something goes wrong
      return NextResponse.json({ message: "Failed to fetch data", error: error.message }, { status: 500 });
      }
  }