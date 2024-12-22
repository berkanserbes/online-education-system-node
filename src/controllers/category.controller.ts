import { BaseResponseDTO } from "../dtos/base/base-response.dto";
import { CategoryResponseDTO } from "../dtos/category/category-response.dto";
import { CreateCategoryDTO } from "../dtos/category/create-category.dto";
import { CategoryService } from "../services/category.service";
import { MESSAGES } from "../utils/message.util";
import { Request, Response } from "express";

export class CategoryController {
  public static async createCategory(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { name } = req.body;

      let response: BaseResponseDTO<CategoryResponseDTO>;

      if (!name) {
        response = {
          data: null,
          isSuccess: false,
          message: MESSAGES.ERROR.INVALID_REQUEST,
        };

        return res.status(400).json(response);
      }

      const dto: CreateCategoryDTO = {
        name,
      };

      const category = await CategoryService.createCategory(dto);

      response = {
        message: MESSAGES.SUCCESS.CREATED,
        isSuccess: true,
        data: category,
      };

      return res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
