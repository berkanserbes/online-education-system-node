import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/password.util";
import { ROLE } from "../utils/role.utils";

export class UserService {
  /**
   * Creates a new user in the database and returns the user's details.
   * The password is hashed before saving the user to ensure security.
   *
   * @param dto - An object containing the user's details to be created (CreateUserDTO).
   * @returns {Promise<UserResponseDTO>} - A promise that resolves to the newly created user's details.
   * @throws {Error} - Throws an error if any issue occurs during user creation (e.g., database errors).
   */
  static async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      const hashedPassword = await hashPassword(dto.password, 10);

      const user: User = await User.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        emailVerified: false, // Add default value
        role: ROLE.USER, // Add default role
      });

      const result: UserResponseDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
