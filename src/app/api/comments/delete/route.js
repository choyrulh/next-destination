import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Destinasi from "@/(models)/Destinasi";

export async function DELETE(request) {
  await connectMongo();

  try {
    const url = new URL(request.url);
    const destinationId = url.searchParams.get("destinationId");
    const commentIndex = parseInt(url.searchParams.get("commentIndex"));

    if (!destinationId || commentIndex === undefined) {
      return NextResponse.json({ status: 400, message: "Missing parameters" });
    }

    const destination = await Destinasi.findOne({ id: destinationId });

    if (!destination) {
      return NextResponse.json({ status: 404, message: "Destination not found" });
    }

    if (!destination.comments[commentIndex]) {
      return NextResponse.json({ status: 404, message: "Comment not found" });
    }

    destination.comments.splice(commentIndex, 1);
    await destination.save();

    return NextResponse.json({ status: 200, message: "Comment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
