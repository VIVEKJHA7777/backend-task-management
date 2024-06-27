const User =require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateToken');

//signup functionality
const signup = async (req,res)=>{
    try{
      const {username,password}=req.body;
     
      const user = await User.findOne({username});
      if(user){
        return res.status(400).json({error:"username already exists"});
      }

      //Hash password here
      const salt= await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
//........................................................................................
      //create new user
      const newUser= new User({
        username,
        password:hashedPassword
      })
      if(newUser){

      //generate jwt token here
      generateTokenAndSetCookie(newUser._id,res);

      await newUser.save();

      res.status(201).json({
        _id:newUser._id,
        username: newUser.username,
    })
    }
    else{
       res.status(400).json({error:"Invalid user data"}); 
    }
    }
    catch(error){
      console.log("Error in signup controller",error.message);
      res.status(500).json({error:"Internal server Error"});
    }
}

//login functionality
const login = async (req,res)=>{
    try{
      const { username,password }= req.body;
      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");  //not throwa ny error

      if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"});
      }

      //jwt functionality
      generateTokenAndSetCookie(user._id,res);
   //   console.log(req.cookies.jwt);

      res.status(200).json({
        _id:user._id,
        username: user.username, 
    })
    }
    catch(error){
      console.log("Error in login controller",error.message);
      res.status(500).json({error:"Internal server Error"});
    }
}

//logout functionality
const logout = (req,res)=>{
    try{
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({message:"Logged out successfully"});
    }
    catch(error){
      console.log("Error in logout controller",error.message);
      res.status(500).json({error:"Internal server Error"});
    }

}

module.exports ={
    signup,
    login,
    logout
}

