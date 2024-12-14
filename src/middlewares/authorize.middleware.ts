import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ROLE } from "../utils/role.utils";
import { MESSAGES } from "../utils/message.util";

// export const authorize = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === ROLE.ADMIN) {
    next();
  } else {
    return res.status(403).json({ message: MESSAGES.AUTH.ADMIN_ONLY_ACCESS });
  }
};
