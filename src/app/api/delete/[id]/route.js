import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    await Patient.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Patient deleted",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}