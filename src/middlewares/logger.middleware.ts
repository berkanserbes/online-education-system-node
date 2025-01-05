import { Request, Response, NextFunction } from "express";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const now = new Date();
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;

  console.log(`[${now.toISOString()}] ${method} ${url} - Status: ${status}`);

  if (Object.keys(req.body).length > 0) {
    console.log("Request Body:", req.body);
  }

  next();
};
