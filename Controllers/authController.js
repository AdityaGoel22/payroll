import UserModel from "../Models/userModel.js";
import { registerUser, loginUser, sendResetPasswordLink, getUserToken, resetPasswordService } from "../Services/authService.js";

export const register = async(req, res)=>{
    const {empid, password, email}=req.body;
    if(!empid||!password||!email){
        return res.status(400).json({success:false, message:'All fields are required'})
    };

    const user = new UserModel({empid, password, email});

    try {
        const response = await registerUser(user);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Registration failed"};
    }
}

export const login =async(req, res)=>{
    const {empid,password}= req.body;
    if(!empid||!password){
        return res.status(400).json({success:false,message:"All fields are required"});
    }

    try {
        const response = await loginUser(empid, password);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Login failed"};
    }
}

export const forgotPassword =async(req, res)=>{
    const {email}= req.body;
    if(!email){
        return res.status(400).json({success:false,message:"Email is required"});
    }

    try {
        const response = await sendResetPasswordLink(email);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Login failed"};
    }
}

export const resetPassword =async(req, res)=>{
    const {token, password}= req.body;
    if(!token||!password){
        return res.status(400).json({success:false,message:"Password is required"});
    }

    try {
        const response = await resetPasswordService(token, password);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Login failed"};
    }
}

export const getUserFromToken=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({success:false,message:"Token Not Provided"})
    }
    try {
        const response = await getUserToken(token);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Failed To Fetch Data"};
    }
}