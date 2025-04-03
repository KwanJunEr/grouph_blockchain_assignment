
const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI1); // Debugging output
        console.log("MONGO_DB_NAME:", process.env.MONGO_DB_NAME); // Debugging output

        await mongoose.connect(process.env.MONGO_URI1, {
            dbName: process.env.MONGO_DB_NAME, // Set the database name
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB Database:", process.env.MONGO_DB_NAME);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit with failure
    }
};

export default connectMongoDB;