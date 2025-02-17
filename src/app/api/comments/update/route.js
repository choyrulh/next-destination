import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Destinasi from "@/(models)/Destinasi";

export async function PUT(request) {
  await connectMongo();

  try {
    const body = await request.json();
    const { destinationId, commentIndex, text } = body;

    if (!destinationId || commentIndex === undefined || !text) {
      return NextResponse.json({ status: 400, message: "Missing required fields" });
    }

    const destination = await Destinasi.findOne({ id: destinationId });

    if (!destination) {
      return NextResponse.json({ status: 404, message: "Destination not found" });
    }

    if (!destination.comments[commentIndex]) {
      return NextResponse.json({ status: 404, message: "Comment not found" });
    }

    destination.comments[commentIndex].text = text;
    destination.comments[commentIndex].updatedAt = new Date();
    await destination.save();

    return NextResponse.json({ status: 200, message: "Comment updated successfully" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
