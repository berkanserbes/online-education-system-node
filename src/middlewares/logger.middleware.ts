import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] Incoming request to ${req.path}`);

  next();
};
