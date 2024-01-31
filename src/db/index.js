import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB=async()=>{
    try{
      const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log(`\n Mongo DB Connected!! DB Host: ${connectionInstance.connection.host}`);
    }catch(e){
        console.log("Mongodb connection error",e);
        process.exit(1);
    }
}

export default connectDB