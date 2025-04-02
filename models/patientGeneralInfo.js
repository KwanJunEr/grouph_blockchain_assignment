import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI)
mongoose.Promise = global.Promise;

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String },
    bloodType: { type: String },
    houseAddress: { type: String },
    height: { type: String }, // Ensure this is stored as a number (cm)
    weight: { type: String }, // Ensure this is stored as a number (kg)
    email: { type: String, unique: true, lowercase: true }, // Email should be unique & lowercase
    phone: { type: String }, // Store as string to support different formats
    chronicConditions: { type: String },
    allergies: { type: String },
    medications: { type: String },
    userAddress: { type: String, required: true }, // Blockchain address (required)
    documentHash: { type: String, required: true }
  },
  {
    
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Ensure model uses 'patientData' collection
const PatientData = mongoose.models.PatientData || mongoose.model('PatientData', patientSchema);

export default PatientData;
