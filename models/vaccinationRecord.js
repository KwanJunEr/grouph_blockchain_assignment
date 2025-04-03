import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const vaccineRecordSchema = new Schema(
  {
    userAddress: { type: String, required: true }, // Blockchain address (required)
    documentHash: { type: String, required: true }, // Hash for document verification
    name: { type: String, required: true }, // Patient Name
    date: { type: String, required: true }, // Date of vaccination
    vaccineName: { type: String, required: true }, // Name of the vaccine
    location: { type: String, required: true }, // Location of vaccination
    administeringDoctor: { type: String, required: true }, // Doctor who administered the vaccine
    notes: { type: String }, // Additional notes if needed
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Ensure model uses 'vaccineRecords' collection
const VaccineRecord =
  mongoose.models.VaccineRecord || mongoose.model("VaccineRecord", vaccineRecordSchema);

export default VaccineRecord;
