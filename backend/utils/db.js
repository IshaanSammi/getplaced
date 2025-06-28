import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/jobportal");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;