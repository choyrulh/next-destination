// app/api/destinasi/filterby/route.js
import { NextResponse } from "next/server";
import connectMongo from "./../../../../lib/mongo/connect-mongo";
import Destinasi from "./../../../../(models)/Destinasi";

export async function GET(request) {
  await connectMongo();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const location = searchParams.get("location");
  const category = searchParams.get("category");

  try {
    let query = {};

    // Fitur Pencarian (Search)
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    // Fitur Filter
    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    const destinasi = await Destinasi.find(query);
    return NextResponse.json({
      status: 200,
      message: "success",
      length: destinasi.length,
      data: destinasi,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
