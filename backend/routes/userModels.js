import mongoose, { model } from "mongoose";

const userSchema = new  mongoose.Schema({
    clerkId:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    photo:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    creditBalance:{type:Number, required:true},
});

const userModel= mongoose.model.user || mongoose.model("User", userSchema);

export default userModel;