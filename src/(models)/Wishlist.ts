// /(models)/Wishlist.ts
import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Wishlist",
  }
);

const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;
