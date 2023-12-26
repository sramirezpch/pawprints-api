import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IUser, User } from "../../models/user";
import { Model, Document } from "mongoose";
import { verifyPassword } from "../../utils";

export const login = async (req: Request, res: Response) => {
    // Check if user exists in the database
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        
        if(!user || !await user?.verifyPassword(password)) res.status(403).json({ error: "Incorrect email or password" });

        const jwtData = {
            userId: user!._id,
            email: user!.email
        }
        
        const token = jwt.sign({ data: jwtData }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN })

        res.json({ token });
    } catch (error) {
        console.log(error);
    }
}