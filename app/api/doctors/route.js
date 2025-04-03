import connectMongoDB from "@/lib/mongodbc.js";
import doctorData from "@/models/doctorData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const doctors = await doctorData.find({});
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}