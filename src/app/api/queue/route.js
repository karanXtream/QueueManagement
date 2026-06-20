import { connectDB } from "@/lib/mongodb";
import QueueState from "@/models/QueueState";
import Patient from "@/models/Patient";

export async function GET() {
  try {
    await connectDB();

    const queueState = await QueueState.findOne();

    const waitingPatients =
      await Patient.countDocuments({
        status: "waiting",
      });

    return Response.json({
      currentServing: queueState.currentServing,
       avgConsultationTime:
        queueState.avgConsultationTime,
         waitingPatients,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}