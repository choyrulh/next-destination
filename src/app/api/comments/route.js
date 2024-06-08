import data from "./data";

export async function GET() {
  return Response.json({
    status: 200,
    message: "success",
    length: data.length,
    data: data,
  });
}

export async function POST(req) {
  try {
    const { name, comment } = await req.json();

    if (!name || !comment) {
      return Response.json({
        status: 400,
        message: "Kolom nama dan komentar harus diisi",
      });
    }

    const newComment = {
      id: comments.length + 1,
      name: name,
      comment: comment,
    };
    comments.push(newComment); // Menambahkan komentar baru ke array comments
    return Response.json({
      status: 200,
      message: "Komentar berhasil ditambahkan",
      data: newComment,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Terjadi kesalahan saat menambahkan komentar",
      error: error.message,
    });
  }
}
