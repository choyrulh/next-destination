import { NextResponse } from "next/server";
import Destinasi from "../../../../(models)/Destinasi";
import connectMongo from "../../../../lib/mongo/connect-mongo";

export async function GET() {
  await connectMongo();
  try {
    const locations = await Destinasi.distinct("location");

    // Process locations to keep only the first word before the comma and remove duplicates
    const cleanedLocations = [
      ...new Set(locations.map((loc) => loc.split(",")[0].trim())),
    ];

    return NextResponse.json(cleanedLocations);
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
