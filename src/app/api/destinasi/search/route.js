import { NextResponse } from "next/server";
import Destinasi from "./../../../../(models)/Destinasi";
import connectMongo from "./../../../../lib/mongo/connect-mongo";

export async function GET(request) {
  await connectMongo();
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";

  try {
    const destinasi = await Destinasi.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
      ],
    });

    return NextResponse.json({
      status: 200,
      message: "success",
      length: destinasi.length,
      data: destinasi,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
