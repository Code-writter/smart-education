import mongoose from "mongoose";    
import { config } from "dotenv";

config();


const dbURI = process.env.DB_URI! as string;

const connectDB = async () => {
    try {
        const connectionInstence =  await mongoose.connect(dbURI)
        console.log(`Connected to the database ${connectionInstence.connection.host}`);
    } catch (error : any) {
        console.log('Error connecting to the database', error);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;