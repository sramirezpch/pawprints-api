import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config()

import "./mongodb";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import { authorizationMiddleware } from "./middleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({status: "ok"})
})

app.use('/auth', authRoutes);
app.use(authorizationMiddleware)
app.use('/user', userRoutes);

app.listen(process.env.LISTEN_ADDR)