import { NextResponse } from "next/server";
import { createHash } from 'crypto';
import PatientData from "@/models/patientGeneralInfo"


export async function POST(req) {
  try {
    // Get form data from the request body
    const { documentHash, userAddress, name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications } = await req.json();
    console.log("Received data:", { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress, documentHash});
    
    const newUserProfile = {
      name,
      age,
      gender,
      bloodType,
      houseAddress,
      height,
      weight,
      email,
      phone,
      chronicConditions,
      allergies,
      medications,
      userAddress, // Blockchain address
      documentHash
    };
    
    // Check if document already exists
    const existingDocument = await PatientData.findOne({ documentHash });
    
    if (existingDocument) {
      // Document exists, update it
      const updatedDocument = await PatientData.findOneAndUpdate(
        { documentHash },
        newUserProfile,
        { new: true } // Return the updated document
      );
      
      return NextResponse.json({ 
        message: "Profile Data Updated", 
        data: updatedDocument 
      }, { status: 200 });
    } else {
      // Create new document
      const savedProfile = await PatientData.create(newUserProfile);
      
      return NextResponse.json({ 
        message: "Profile Data Created", 
        data: savedProfile 
      }, { status: 201 });
    }
  } catch (error) {
    console.error("Error:", error);
    // Catch any errors and send a response with error message
    return NextResponse.json({ message: "Operation Failed", error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Extract document hash from the URL query parameters
    const { searchParams } = new URL(req.url);
    const documentHash = searchParams.get('hash');
    
    if (!documentHash) {
      return NextResponse.json({ message: "Document hash is required" }, { status: 400 });
    }
    
    console.log("Looking for document with hash:", documentHash);
    
    // Find the patient data by document hash
    const patientData = await PatientData.findOne({ documentHash });
    
    if (!patientData) {
      return NextResponse.json({ message: "Patient data not found" }, { status: 404 });
    }
    
    console.log("Found patient data:", patientData);
    
    // Return the patient data
    return NextResponse.json({ data: patientData }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving patient data:", error);
    return NextResponse.json({ message: "Error retrieving patient data", error: error.message }, { status: 500 });
  }
}