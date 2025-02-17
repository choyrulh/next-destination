import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Destinasi from "@/(models)/Destinasi";

// GET - Retrieve all comments for a destination
export async function GET(request, { params }) {
  try {
    const { destinationId } = params;
    await connectMongo();

    const destination = await Destinasi.findOne(
      { id: destinationId },
      { comments: 1 }
    );

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, comments: destination.comments },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
