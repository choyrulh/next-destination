import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongo from "./../../../../lib/mongo/connect-mongo";
import Destinasi from "./../../../../(models)/Destinasi";

export async function GET(request, { params }) {
  await connectMongo();
  const id = params.id;

  try {
    let query = { id };

    // If the ID looks like a MongoDB ObjectId, search by _id as well
    if (ObjectId.isValid(id)) {
      query = { $or: [query, { _id: new ObjectId(id) }] };
    }

    const destinasi = await Destinasi.findOne(query);

    if (!destinasi) {
      return NextResponse.json({
        status: 404,
        message: "Destinasi not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "success",
      data: destinasi,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

// export async function GET(request, { params }) {
//   await connectMongo();
//   const { id } = params;

//   try {
//     const destinasi = await Destinasi.findOne({ id: id });

//     if (!destinasi) {
//       return NextResponse.json({
//         status: 404,
//         message: "Data tidak ditemukan",
//       });
//     }

//     return NextResponse.json({
//       status: 200,
//       message: "success",
//       data: destinasi,
//     });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: error.message });
//   }
// }
