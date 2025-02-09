require('dotenv').config();
const mongoose = require("mongoose");

const startMongooseConnection = async () => {
    try {
        console.log("Trying to connect to mongoose")
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports =  startMongooseConnection ;