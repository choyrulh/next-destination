import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo/connect-mongo";
import Wishlist from "@/(models)/Wishlist";

export async function DELETE(request) {
  await connectMongo();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ status: 400, message: "Missing id parameter" });
    }

    const deletedItem = await Wishlist.findOneAndDelete({ id });

    if (!deletedItem) {
      return NextResponse.json({ status: 404, message: "Item not found in wishlist" });
    }

    return NextResponse.json({
      status: 200,
      message: "Item removed from wishlist",
      data: deletedItem,
    });

  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
