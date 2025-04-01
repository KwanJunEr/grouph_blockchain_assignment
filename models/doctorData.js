import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        specialty: {type:String, required: true}
    },
    { collection: "doctorData" }
);

// Only use one method to specify the collection name
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema, "doctorData");
export default Doctor;
