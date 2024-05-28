// import {asyncHandler} from "../utils/asyncHandler.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../../utils/cloudinary.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    //get user details from frontend
    //validation - not empty
    // check if user already exists: username , email
    //check for avtar
    //upload them on cloudinary , avtar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return res

    const{username , email , password , dob}=req.body
    // console.log("email: " ,email);

    // if(username === ""){
    //     // throw new ApiError(400, "Username is required")
        
    // }

    if(
        [username , email , password , dob ].some((field) =>
            field?.trim() === ""
        )
    ){
        throw new ApiError(400 , "All fields are required")
    }


    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // console.log(req.files.avatar[0].path) --> public\temp\Screenshot (9).png

    // console.log(req.body.avatar)
    // console.log(req.files)
    // [Object: null prototype] {
    //     avatar: [
    //       {
    //         fieldname: 'avatar',
    //         originalname: 'a.png',
    //         encoding: '7bit',
    //         mimetype: 'image/png',
    //         destination: './public/temp',
    //         filename: 'a.png',
    //         path: 'public\\temp\\a.png',
    //         size: 2449322
    //       }
    //     ]
    //   }
    const avatarLocalPath = req.files?.avatar[0]?.path;

    //let avatarLocalPath;
    //if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
    // avatarLocalPath = req.files.avatar[0].path;
    //}
    
    // console.log(avatarLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400 , "LocalPath : Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    
    if(!avatar){
        throw new ApiError(400 , "cloudinary : Avatar file is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        avatar : avatar.url,
        email,
        password,
        dob
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered successfully")
    )

} )


const generateAccessandRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false }) //whenever saving mongoose will try to save all fields agains , so validateBeforeSave is false so only refreshToken will get saved

        return { accessToken , refreshToken }

    } catch (error) {
        throw new ApiError(500 , "Spmething went wrong while generating refresh and access token")
    }
}

const loginUser = asyncHandler( async (req,res) => {
    //take data from req body
    //check username and email
    //validate pass if user exist
    //send response of login if user does not exist
    //assign a accessToken
    //assign a refreshToken
    //send cookie

    const {email , username , password} = req.body;

    // console.log(req.body);

    if((username == '') && (email == '')) {
        throw new ApiError(400 , "Username or Email is required")
    }

    // console.log(username)
    // console.log(email)

    const user = await User.findOne({
        $or: [ {username} , {email} ]
    })
    
    // console.log(user)

    if(!user){
        throw new ApiError(404 , "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken , refreshToken } = await generateAccessandRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")
    // const loggedInUser =  User.findById(user._id).
    // select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    //cookie is bydefault modifiable by anyone on frontend , when done this things , it is no more modifiable

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser , accessToken , refreshToken 
            },
            // {
            //     user: loggedInUser , accessToken , refreshToken //if have set this tokens in the cookies , why we are sending it explicitly again?
            //                                                     //we are handling that case where user want to save token by himself , while this is not a good practice
            //                                                     //but may be he want to save in local storage or he is handling mobile app
            // },
            "User logged In successfully"
        )
    )


})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(new ApiResponse(200,{},"User logged Out"))
})

export { 
    registerUser,
    loginUser,
    logoutUser
}