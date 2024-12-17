import { connect } from "http2";
import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./utils/db";

dotenv.config()



// create server
try {
    connectDB();
    app.listen(process.env.PORT, () => {    
        console.log(`Server is running on port ${process.env.PORT}`);
    
    });
} catch (error) {
    console.log('Error starting the server', error);
}

