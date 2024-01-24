import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";

export const login = async (req: Request, res: Response) => {
  // Check if user exists in the database
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user || !(await user?.verifyPassword(password)))
      return res.status(403).json({ error: "Incorrect email or password" });

    const jwtData = {
      userId: user!._id,
      email: user!.email,
    };

    const token = jwt.sign(
      { data: jwtData },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ fullName: name, email, password });

    res.status(201).json({ userId: user._id });
  } catch (error: any) {
    res.status(500).json({ error: error.errors });
  }
};
