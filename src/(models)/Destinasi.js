// models/Destinasi.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
      trim: true
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      maxLength: [1000, "Comment cannot be longer than 1000 characters"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { 
    _id: true // Enable _id for each comment to allow for future comment management
  }
);

const DestinasiSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true // Add index for faster queries
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      src: {
        type: String,
        required: true,
        trim: true
      },
      alt: {
        type: String,
        required: true,
        trim: true
      }
    },
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    comments: {
      type: [CommentSchema],
      default: [] // Menambahkan default array kosong
    }
  },
  {
    collection: "Destinasi",
    timestamps: true // Add timestamps for document creation and updates
  }
);

// Add index for text search on title and description
DestinasiSchema.index({ title: 'text', description: 'text' });

const Destinasi = mongoose.models.Destinasi || mongoose.model("Destinasi", DestinasiSchema);

export default Destinasi;