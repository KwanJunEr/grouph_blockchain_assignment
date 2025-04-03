import { NextResponse } from "next/server";
import { createHash } from 'crypto';
import PatientData from "@/models/patientGeneralInfo"


export async function POST(req) {
  try {
  
  // Get form data from the request body
    const { documentHash, userAddress, name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications } = await req.json();
    console.log("Received data:", { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress, documentHash});
    // Validate required fields

    // Generate a unique document hash
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
      // Add the generated hash as the ID
      documentHash
    };
    console.log(newUserProfile);

    // Insert into the 'patientData' collection
    await PatientData.create(newUserProfile);

    // Respond with the saved profile data (including MongoDB ID)
    return NextResponse.json({ message: "Profile Data Created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    // Catch any errors and send a response with error message
    return NextResponse.json({ message: "No Data Created", error: error.message }, { status: 500 });
  }
}
