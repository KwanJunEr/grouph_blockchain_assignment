import { connectToDatabase } from '../../../lib/mongodb'; // MongoDB connection helper
import patientData from "@/models/patientData"; // Assuming patientData is the model
import { NextResponse } from "next/server";
import { createHash } from 'crypto';

const generateHashID = (data) => {
  const hash = createHash('sha256');  // Use SHA-256 for hashing (or any other hashing algorithm)
  const dataString = JSON.stringify(data);  // Convert the data to a string format

  hash.update(dataString);  // Update the hash with the data

  return hash.digest('hex');  // Return the hash as a hexadecimal string
};

export async function POST(req) {
  try {
    // Connect to the MongoDB database
    const { client, db } = await connectToDatabase();  // Access both client and db

    // Check if the connection is successful
    await client.db().command({ ping: 1 });
    console.log("MongoDB connection is successful!");

    // Get form data from the request body
    const { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress } = await req.json();
    console.log("Received data:", { name, age, gender, bloodType, houseAddress, height, weight, email, phone, chronicConditions, allergies, medications, userAddress });

    // Validate required fields
    if (!name || !age) {
      return NextResponse.json(
        { message: "Missing required fields: name and age" },
        { status: 400 } // Bad Request
      );
    }

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
      documentHash, // Add the generated hash as the ID
    };

    // Insert into the 'patientData' collection using Mongoose's create method
    const result = await patientData.create(newUserProfile);

    // Respond with the saved profile data (including MongoDB ID)
    return NextResponse.json({ message: "Profile Data Created", data: result }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    // Catch any errors and send a response with error message
    return NextResponse.json({ message: "No Data Created", error: error.message }, { status: 500 });
  }
}
