import { Request, Response } from "express";

import { User } from "../../models/user";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ fullName: name, email, password });

        res.status(201).json({ userId: user._id });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getUsers = (req: Request, res: Response) => {
    res.send('22')
}