import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { MESSAGES } from "../utils/message.util";

export const validateRequest = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body);

    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      // Validasyon hataları varsa
      const errorMessages = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      res.status(400).json({
        message: MESSAGES.ERROR.VALIDATE_DATA,
        isSuccess: false,
        errors: errorMessages,
      });

      return;
    }

    next();
  };
};
