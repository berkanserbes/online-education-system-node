import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../utils/message.util";
import { BaseResponseDTO } from "../dtos/base/base-response.dto";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization;

    let response: BaseResponseDTO<any>;
    if (!authToken?.startsWith("Bearer ")) {
      response = {
        message: MESSAGES.AUTH.UNAUTHORIZED,
        isSuccess: false,
        data: null,
      };
      return res.status(401).json(response);
    }

    const token = authToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      response = {
        message: MESSAGES.ERROR.NOT_FOUND,
        isSuccess: false,
        data: null,
      };
      return res.status(404).json(response);
    }

    req.user = user;

    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
