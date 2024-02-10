import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.on('error',(e)=>{
       console.log("Error:",e);
    })
    app.listen(process.env.Port || 8000,()=>{
        console.log(`Server running at port :${process.env.Port}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection falid !!",err);
})