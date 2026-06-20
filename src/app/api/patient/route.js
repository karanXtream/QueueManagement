import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";
import QueueState from "@/models/QueueState";

export async function POST(req) {
  try {
    await connectDB();
  
    const { patientName } = await req.json();

    let queueState = await QueueState.findOne();

    if (!queueState) {
      queueState = await QueueState.create({
        currentServing: 0,
        avgConsultationTime: 5,
        lastTokenIssued: 0,
      });
    }

    const nextToken = (queueState.lastTokenIssued || 0) + 1;

    const patient = await Patient.create({
      patientName,
      token: nextToken,
      status: "waiting",
    });

    queueState.lastTokenIssued = nextToken;
    await queueState.save();

    return Response.json({
      success: true,
      patient,
    });
  } catch (error) {
    console.log("pationsRoute",error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}