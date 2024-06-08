import data from "../data";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = data.find((user) => user.id == id);
    if (!user) {
      return Response.json({
        status: 404,
        message: "data not found",
      });
    }

    return Response.json({
      status: 200,
      message: "success",
      data: user,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const name = body.name;

    if (!name) {
      return Response.json({
        status: 400,
        message: "Kolom komentar harus diisi",
      });
    }

    const updateData = data.findIndex((data) => data.id == parseInt(params.id));

    data[updateData].name = name;
    return Response.json({
      status: 200,
      message: "success",
      data: data[updateData],
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const index = data.findIndex((user) => user.id == id);

    if (index === -1) {
      return Response.json({
        status: 404,
        message: "user not found",
      });
    }

    data.splice(index, 1);
    return Response.json({
      status: 200,
      message: "user successfully deleted",
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "throw error",
      error: error.message,
    });
  }
}
