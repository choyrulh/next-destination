import { NextResponse } from "next/server";
import connectMongo from "./../../../lib/mongo/connect-mongo";
import Destinasi from "./../../../(models)/Destinasi";

export async function GET() {
  await connectMongo();
  try {
    const destinasi = await Destinasi.find({});
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
