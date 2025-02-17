import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Wishlist from "@/(models)/Wishlist";

export async function GET() {
  await connectMongo();

  try {
    const wishlistItems = await Wishlist.find();

    return NextResponse.json({
      status: 200,
      message: "success",
      length: wishlistItems.length,
      data: wishlistItems,
    });

  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
