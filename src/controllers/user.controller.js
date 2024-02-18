import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user_models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asyncHandler(async (req,res)=>{
    // get user details from frontend.
    // validation - not empty
    // check if user already exist: username, email
    // check images, avatar.
    // upload them to cloudinary
    // create user object - create entry in db.
    // remove password and refresh token field from responce
    // check for user creation 
    console.log(req.body);
    const {fullName,email,username,password}=req.body
    
    //Vaildation 
    if([fullName,email,password,username].some((field)=>field?.trim()==="" || field===undefined)){
       return res.json(new ApiError(401,"Input Filed is Empty!!!"));
    }

    // already exist or not
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        return res.status(200).json(new ApiError(400,"User With this username or email already exist!!"));
    }

    //create User object and add to DB.
    const createdUser=await User.create({
        fullname:fullName,
        email:email,
        password:password,
        username:username.toLowerCase()
    })


    const user=await User.findById(createdUser._id).select("-password -refreshToken");
    // check if user Successfully created or not.
    if(!user){
       return res.json( new ApiError(501,"Some thing is wrong while registering user"));
    }
    
    return res.status(201).json(
        new ApiResponse(200,user,"User created Successfully")
    )
})

export {registerUser}