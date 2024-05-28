import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

//cant encode directly so taking help from mongoose by using its hooks (pre)



const userSchema = new Schema({
    // username: String,
    // email: String,
    // password: String,
    // dob: Date,
    // verifyCode: String,
    // verifyCodeExpiry: Date,
    // // uniqueCode: {
    // //     type: mongoose.Schema.types.ObjectId,
    // //     ref: 'GeneratedCode'
    // // }
    // uniqueCode: String,
    // message: [{
    //     type: mongoose.Schema.types.ObjectId,
    //     ref: 'Message'
    // }]
    username: {
        type: String,
        unique: [true,"This username already exists"],
        required: [true,"Username is required"],
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/,"Please enter a valid email"],
        unique: [true , "This email is already registered"],
        required: [true , " Email is required"]
    },
    password: {
        type: String,
        required: [true , "Password is required"]        
    },
    dob: {
        type: String,
        required: [true,"Date of Birth is required"],
        // validate: {
        //     validator: function(dateOfBirth) {
                
        //         const age = Math.floor((new Date() - dateOfBirth) / 31557600000); // 31557600000 ms = 1 year
        
        //         // Check if age is within the allowed range 
        //         return age >= 18 && age <= 70;
        //       },
        //       message: props => `${props.value} is not a valid age. Must be between 18 and 70 years.`
        //     }
    },
    avatar: {
        type: String, //cloudinary
        required: true
    },
    uniqueCode: {
        type: Schema.Types.ObjectId,
        ref: "GeneratedCode"
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

//this will run just before saving the data to the db

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//next , since it is a middleware 
//cant use arrow function because of (this)

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password)
}

//we can add custom functions
//this function check if password stored is correct or not


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)


//we will use cloudinary and multer to store images
//first the images uploaded will be kept locally in public file
//then it will uploaded get uploaded by multer
//it will make the process more user friendly , if by any chance
//uploads fails we dont have to ask the user to upload it agin
//we will just take the image from the public file and try to upload it again
