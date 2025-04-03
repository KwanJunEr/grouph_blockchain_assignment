import { NextResponse } from "next/server";
import { createHash } from 'crypto';
import PatientData from "@/models/patientGeneralInfo"

const generateHashID = (data) => {
  const hash = createHash('sha256');  // Use SHA-256 for hashing (or any other hashing algorithm)
  const dataString = JSON.stringify(data);  // Convert the data to a string format

  hash.update(dataString);  // Update the hash with the data

  return hash.digest('hex');  // Return the hash as a hexadecimal string
};

export async function POST(req) {
  try {
  
  // Get form data from the request body
    const { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress } = await req.json();
    console.log("Received data:", { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress });
    // Validate required fields

    // Generate a unique document hash
    const documentHash = generateHashID({ userAddress, name });

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
