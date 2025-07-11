import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const createToken = (
  jwtPayload: { email: string; name: string; photoURL: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, `Token not valid!`);
  }
};

export const isPasswordMatched = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const createHashedPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, Number(config.bcrypt_salt));
};
