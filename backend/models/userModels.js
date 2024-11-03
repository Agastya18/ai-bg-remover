import mongoose, { model } from "mongoose";

const userSchema = new  mongoose.Schema({
    clerkId:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    photo:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    creditBalance:{type:Number, default:100},
});

const User= mongoose.model("User", userSchema);

export default User;