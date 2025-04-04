import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const doctorSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        specialty: {type:String, required: true},
        address : { type: String, required: true }
    },
    { collection: "doctorData" }
);

// Only use one method to specify the collection name
const DoctorData = mongoose.models.DoctorData || mongoose.model('DoctorData', doctorSchema);
export default DoctorData;
