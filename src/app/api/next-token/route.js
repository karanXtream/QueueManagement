import { connectDB } from "@/lib/mongodb";
import QueueState from "@/models/QueueState";

export async function POST() {
  try {
    await connectDB();

    let queueState = await QueueState.findOne();

    if (!queueState) {
      return Response.json(
        {
          success: false,
          message: "Queue state not found",
        },
        { status: 404 }
      );
    }

    queueState.currentServing += 1;

    await queueState.save();

    global.io?.emit("queue-update", {
      currentServing:
        queueState.currentServing,

      avgConsultationTime:
        queueState.avgConsultationTime,
    });



    return Response.json({
      success: true,
      currentServing: queueState.currentServing,
      avgConsultationTime: queueState.avgConsultationTime,
    });
  } catch (error) {
    console.log("nextTokenError", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}