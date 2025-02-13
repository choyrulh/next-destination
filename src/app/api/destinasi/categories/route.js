import { NextResponse } from "next/server";
import Destinasi from "../../../../(models)/Destinasi";
import connectMongo from "../../../../lib/mongo/connect-mongo";

export async function GET() {
  await connectMongo();
  try {
    const categories = await Destinasi.distinct("category");
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
