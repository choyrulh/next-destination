import { NextResponse } from "next/server";
import connectMongo from "./../../../../lib/mongo/connect-mongo";
import Destinasi from "./../../../../(models)/Destinasi";

export async function GET(request) {
  await connectMongo();
  const url = new URL(request.url);
  const location = url.searchParams.get("location") || "";
  const category = url.searchParams.get("category") || "";

  const filter = {};
  if (location) filter.location = { $regex: location, $options: "i" };
  if (category) filter.category = { $regex: category, $options: "i" };

  try {
    const destinasi = await Destinasi.find(filter);

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
