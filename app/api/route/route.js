// app/api/doctors/route.js
import connectMongoDB from "@/lib/mongodb";
import doctorData from "@/models/doctorData";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse JSON body correctly
        const body = await request.json();
        const { name, description, location, specialty} = body;

        // Validate input
        if (!name || !description || !location || !specialty) {
            return NextResponse.json(
                { message: "Missing required fields: name and description" },
                { status: 400 } // Bad Request
            );
        }

        await connectMongoDB(); // Ensure database connection
        
        // Insert data into the database
        await doctorData.create({ name, description, location, specialty});

        return NextResponse.json(
            { message: "Doctor data added successfully" },
            { status: 201 } // Created
        );
    } catch (error) {
        console.error("Error adding doctor data:", error);

        return NextResponse.json(
            { message: "Failed to add doctor data", error: error.message },
            { status: 500 } // Internal Server Error
        );
    }
}
