import { Request, Response } from "express";
import { Types, Error } from "mongoose";

import { User } from "../../models/user";

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ method: "GET", function: "Get Users" });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    if (!user)
      return res.status(404).json({ error: `No user found with ID ${id}` });

    res.status(201).json({ user });
  } catch (error: any) {
    if (error instanceof Error.CastError)
      return res.status(400).json({
        error: `Failed to cast ID ${id} to ObjectId`,
        type: error.name,
      });
  }
};
