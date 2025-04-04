import DoctorData from "@/models/doctorData";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Fetch all doctors from the collection
    const doctors = await DoctorData.find({});
    
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  } finally {

  }
}