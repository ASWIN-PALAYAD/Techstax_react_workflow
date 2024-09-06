import mongoose from "mongoose";
import 'dotenv/config'; 


const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected');
        
    } catch (error) {
        console.log(`Error:${error.message}`); 
        
    }
}

export default dbConnect;