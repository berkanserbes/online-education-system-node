import bcrypt from "bcryptjs";

/**
 * Hashes a plain password using bcrypt with a specified salt round.
 *
 * @param {string} password - The plain text password to be hashed.
 * @param {number} saltRound - The number of salt rounds to be used by bcrypt for hashing.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
export const hashPassword = async (
  password: string,
  saltRound: number
): Promise<string> => {
  return await bcrypt.hash(password, saltRound);
};

/**
 * Compares a plain password with a hashed password using bcrypt.
 *
 * @param {string} plainPassword - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
