import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Wishlist from "@/(models)/Wishlist";

export async function POST(request) {
  await connectMongo();

  try {
    const body = await request.json(); // Parse the request body

    const { id, title, description, location, category, image, lat, lon } = body;

    // Check if required fields exist
    if (!id || !title || !description || !location || !category || !image?.src || !image?.alt || lat === undefined || lon === undefined) {
      return NextResponse.json({ status: 400, message: "Missing required fields" });
    }

    // Check if the item is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({ id });
    if (existingWishlistItem) {
      return NextResponse.json({ status: 409, message: "Item already in wishlist" });
    }

    // Create new wishlist item
    const newWishlistItem = new Wishlist({
      id,
      title,
      description,
      location,
      category,
      image,
      lat,
      lon,
    });

    await newWishlistItem.save();

    return NextResponse.json({
      status: 201,
      message: "Item added to wishlist successfully",
      data: newWishlistItem,
    });

  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
