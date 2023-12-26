import bcrypt from "bcrypt";

export const verifyPassword = async (enteredPassword: string, hashedPassword: string) => {
    await bcrypt.compare(enteredPassword, hashedPassword);
}