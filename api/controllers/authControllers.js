import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


export const registerUSer = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    user = new User(req.body); 
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({message:"user registered successfully"})

    return res.status(200).send({ messag: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "somthing went wrong" });
  }
};

export const loginUser = async (req, res) => {
    
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        res.cookie("workflow_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:8640000,
        });
        res.status(200).json({userId:user._id})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong'});
        
    }
};
