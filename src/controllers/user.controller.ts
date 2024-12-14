import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { BaseResponseDTO } from "../dtos/base/base-response.dto";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { MESSAGES } from "../utils/message.util";

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<any> {
    try {
      const dto: CreateUserDTO = req.body;

      const newUser: UserResponseDTO = await UserService.createUser(dto);

      const response: BaseResponseDTO<UserResponseDTO> = {
        message: MESSAGES.SUCCESS.CREATED,
        isSuccess: true,
        data: newUser,
      };

      return res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
