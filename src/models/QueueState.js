import mongoose from "mongoose";

const QueueStateSchema = new mongoose.Schema({
  currentServing: {
    type: Number,
    default: 0,
  },

  avgConsultationTime: {
    type: Number,
    default: 5,
  },

   lastTokenIssued: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.QueueState ||
  mongoose.model("QueueState", QueueStateSchema);