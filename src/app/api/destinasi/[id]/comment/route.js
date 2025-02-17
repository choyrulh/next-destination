// path: /api/destinasi/[id]/comments/route.js

import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Destinasi from "@/(models)/Destinasi";

// Helper function to handle errors
const handleError = (error) => {
  console.error("API error:", error);
  return NextResponse.json(
    { success: false, message: error.message },
    { status: 500 }
  );
};

// GET - Retrieve all comments for a destination
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongo();

    const destination = await Destinasi.findOne(
      { id: id },
      { comments: 1 }
    );

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, comments: destination.comments || [] },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

// POST - Add a new comment
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { user, text } = await request.json();

    if (!user || !text) {
      return NextResponse.json(
        { success: false, message: "User and text are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Menggunakan findOneAndUpdate untuk memastikan field comments ada
    const destination = await Destinasi.findOneAndUpdate(
      { id: id },
      { $setOnInsert: { comments: [] } }, // Memastikan comments ada jika dokumen ditemukan
      { new: true, upsert: false }
    );

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found" },
        { status: 404 }
      );
    }

    const newComment = {
      user,
      text,
      createdAt: new Date()
    };

    // Pastikan comments adalah array
    if (!Array.isArray(destination.comments)) {
      destination.comments = [];
    }

    destination.comments.push(newComment);
    await destination.save();

    return NextResponse.json(
      { 
        success: true, 
        message: "Comment added successfully",
        comments: destination.comments[destination.comments.length - 1]
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

// PATCH - Update a comment
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { commentId, text } = await request.json();

    if (!commentId || !text) {
      return NextResponse.json(
        { success: false, message: "Comment ID and text are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const destination = await Destinasi.findOne({ id: destinationId });
    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found" },
        { status: 404 }
      );
    }

    const commentIndex = destination.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    destination.comments[commentIndex].text = text;
    destination.comments[commentIndex].updatedAt = new Date();
    await destination.save();

    return NextResponse.json(
      { 
        success: true, 
        message: "Comment updated successfully", 
        comment: destination.comments[commentIndex]
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

// DELETE - Remove a comment
export async function DELETE(request, { params }) {
  try {
    const { destinationId } = params;
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "Comment ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const destination = await Destinasi.findOne({ id: destinationId });
    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found" },
        { status: 404 }
      );
    }

    const commentIndex = destination.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    // Remove the comment
    destination.comments.splice(commentIndex, 1);
    await destination.save();

    return NextResponse.json(
      { success: true, message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}