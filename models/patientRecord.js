import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const medicalRecordSchema = new Schema(
  {
    userAddress: { type: String, required: true }, // Blockchain address (required)
    documentHash: { type: String, required: true }, // Hash for document verification
    visitedDate: { type: String, required: true }, // Store as String or Date if needed
    type: { type: String, required: true },
    hospital: { type: String, required: true },
    doctorAssigned: { type: String, required: true },
    diagnosis: { type: String, required: true },
    procedure: { type: String },
    treatmentPlans: { type: String },
    medicinePrescription: { type: String },
    labResults: { type: String },
    billingAmount: { type: String },
    notes: { type: String },
    surgeryReport: { type: String }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Ensure model uses 'medicalRecords' collection
const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
