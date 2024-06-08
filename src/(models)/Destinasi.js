// Destinasi.js
import mongoose from "mongoose";

const DestinasiSchema = new mongoose.Schema(
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
    collection: "Destinasi",
  }
);

const Destinasi =
  mongoose.models.Destinasi || mongoose.model("Destinasi", DestinasiSchema);

export default Destinasi;
