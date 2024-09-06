import mongoose  from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

//hasing password before saving
userSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

const User = mongoose.model("User",userSchema);

export default User;