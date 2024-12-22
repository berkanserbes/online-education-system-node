import { CategoryResponseDTO } from "../dtos/category/category-response.dto";
import { CreateCategoryDTO } from "../dtos/category/create-category.dto";
import { Category } from "../models/category.model";
import { MESSAGES } from "../utils/message.util";

export class CategoryService {
  static async createCategory(
    dto: CreateCategoryDTO
  ): Promise<CategoryResponseDTO> {
    try {
      const category = await Category.create({
        name: dto.name,
      });

      const result: CategoryResponseDTO = {
        id: category.id,
        name: category.name,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCategories(): Promise<CategoryResponseDTO[]> {
    try {
      const categories: Category[] = await Category.findAll();

      const result: CategoryResponseDTO[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
      }));

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCategoryById(id: number): Promise<CategoryResponseDTO> {
    try {
      const category: Category | null = await Category.findByPk(id);

      if (!category) {
        throw new Error(MESSAGES.ERROR.NOT_FOUND);
      }

      const result: CategoryResponseDTO = {
        id: category?.id,
        name: category?.name,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
