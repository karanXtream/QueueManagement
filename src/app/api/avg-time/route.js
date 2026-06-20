import { connectDB } from "@/lib/mongodb";
import QueueState from "@/models/QueueState";

export async function PUT(req) {
  try {
    await connectDB();

    const { avgConsultationTime } =
      await req.json();

    const queueState =
      await QueueState.findOne();

    queueState.avgConsultationTime =
      avgConsultationTime;

    await queueState.save();

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}