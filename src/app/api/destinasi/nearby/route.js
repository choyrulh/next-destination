import { NextResponse } from "next/server";
import connectMongo from "./../../../../lib/mongo/connect-mongo";
import Destinasi from "./../../../../(models)/Destinasi";

export async function GET(request) {
  await connectMongo();
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get("lat") || 0);
  const lon = parseFloat(url.searchParams.get("lon") || 0);
  const maxDistance = parseInt(url.searchParams.get("distance") || 100); // in kilometers

  try {
    const destinasi = await Destinasi.find({
      lat: { $exists: true },
      lon: { $exists: true },
    });

    // Calculate distances and filter
    const result = destinasi
      .map((place) => {
        const distance = calculateDistance(lat, lon, place.lat, place.lon);
        return { ...place.toObject(), distance };
      })
      .filter((place) => place.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      status: 200,
      message: "success",
      length: result.length,
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
