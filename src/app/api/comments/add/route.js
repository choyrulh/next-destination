import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Destinasi from "@/(models)/Destinasi";

export async function POST(request) {
  await connectMongo();

  try {
    const body = await request.json();
    const { destinationId, user, text } = body;

    if (!destinationId || !user || !text) {
      return NextResponse.json({ status: 400, message: "Missing required fields" });
    }

    const destination = await Destinasi.findOne({ id: destinationId });

    if (!destination) {
      return NextResponse.json({ status: 404, message: "Destination not found" });
    }

    const newComment = { user, text, createdAt: new Date() };
    destination.comments.push(newComment);
    await destination.save();

    return NextResponse.json({ status: 201, message: "Comment added successfully", data: newComment });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
