const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conInstance = await mongoose.connect(process.env.MONGO_URI + "/projectPal", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conInstance.connection.host}`);
    } catch (error) {
        console.error(`Error in connecting MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
