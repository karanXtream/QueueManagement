import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    patientName: String,
    token: Number,
    status: {
      type: String,
      default: "waiting",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);