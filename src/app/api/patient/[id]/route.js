import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";
import QueueState from "@/models/QueueState";

export async function GET(req, { params }) {
  try {
    await connectDB();
     const { id } = await params;
   


    const patient = await Patient.findById(id);

    if (!patient) {
      return Response.json(
        {
          success: false,
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    const queueState = await QueueState.findOne();

    if (!queueState) {
      return Response.json(
        {
          success: false,
          message: "Queue state not found",
        },
        { status: 404 }
      );
    }

    const tokensAhead = Math.max(
      0,
      patient.token - queueState.currentServing - 1
    );

    const estimatedWait =
      tokensAhead * queueState.avgConsultationTime;

    return Response.json({
      success: true,
      patientId: patient._id,
      patientName: patient.patientName,
      token: patient.token,
      currentServing: queueState.currentServing,
      tokensAhead,
      estimatedWait,
      avgConsultationTime: queueState.avgConsultationTime,
    });

  } catch (error) {
    console.log("patient route error", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}