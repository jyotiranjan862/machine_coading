import mongoose from "mongoose";
import  { IUser,User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const UserController = {
     async createUser(req:any,res:any){
        try{
             const { name, email, password } = req.body;
             const hashedPassword = await bcrypt.hash(password,10)
             const user = new User({ name, email, password: hashedPassword });
             await user.save();
            res.status(201).json({ message: "User created successfully", user });
        }catch(err){
            throw new Error("Error creating user: " + err);
            res.status(500).json({ message: "Error creating user", error: err });
        }
     },

     async getByUserId(req:any,res:any){
        try{
            const {id} = req.params;
            const user= await User.findById(id);
            if(!user){
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({ message: "User fetched successfully", user });
        }catch(err){
            throw new Error("Error fetching user: " + err);
            res.status(500).json({ message: "Error fetching user", error: err });
        }
     },

     async getAllUsers(req:any,res:any){
        try{
            const {page=1,limit =10,search=""} = req.query;
            const query=search ? {name:{$regex:search,$options:"i"}} : {};

            const users= await User.find(query).skip((page-1)*limit).limit(limit);
            if(users.length===0){
                res.status(404).json({ message: "No users found" });
                return;
            }

            res.status(200).json({ message: "Users fetched successfully", users });


        }catch(err){
            throw new Error("Error fetching users: " + err);
            res.status(500).json({ message: "Error fetching users", error: err });
        }
     },

     async updateUser(req:any,res:any){
        try{
            const {id} = req.params;
            const { name, email, password } = req.body;
            if(!name && !email && !password){
                res.status(400).json({ message: "At least one field (name, email, password) must be provided for update" });
                return;
            }
            const user = await User.findById(id);
            if(!user){
                res.status(404).json({ message: "User not found" });
                return;
            }
            if(name) user.name = name;
            if(email) user.email = email;
            if(password) user.password = await bcrypt.hash(password,10);
            await user.save();
            res.status(200).json({ message: "User updated successfully", user });
        }catch(err){

            throw new Error("Error updating user: " + err);
            res.status(500).json({ message: "Error updating user", error: err });
        }
     },

     async deleteUser(req:any,res:any){
        try{
            const {id} = req.params;
            const user= await User.findById(id).lean();
            if(!user){
                res.status(404).json({ message: "User not found" });
                return;
            }
            const result = await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted successfully", user });

        }catch(err){
            throw new Error("Error deleting user: " + err);
            res.status(500).json({ message: "Error deleting user", error: err });
        }
     },

     async loginUser(req:any,res:any){
        try{
            const {email,password} = req.body;
            const user = await User.findOne({email}).lean();
            if(!user){
                res.status(404).json({ message: "User not found" });
                return;
            }
            const ispasswordValid =await bcrypt.compare(password,user.password);
             if(!ispasswordValid){
                res.status(401).json({ message: "Invalid password" });
                return;
             }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

            res.status(200).json({ message: "User logged in successfully", token });
             
        }catch(err){
            throw new Error("Error logging in user: " + err);
            res.status(500).json({ message: "Error logging in user", error: err });
        }
     }

}