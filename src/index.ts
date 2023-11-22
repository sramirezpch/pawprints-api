import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({status: "ok"})
})

app.listen(process.env.LISTEN_ADDR)