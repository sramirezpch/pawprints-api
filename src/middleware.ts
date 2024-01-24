import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { User } from "./models/user";

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token)
    return res.status(403).json({ error: "Missing authentication token" });

  try {
    const { data } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(data.userId);

    if (!user || user.email !== data.email) res.sendStatus(403);

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res
        .status(403)
        .json({ error: "Token has expired", type: error.name });

    console.log(error);
    res.sendStatus(403);
  }
};
