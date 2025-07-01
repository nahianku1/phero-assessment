import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interfaces";
import { createToken, isPasswordMatched, verifyToken } from "./auth.utils";
import config from "../../config/config";
import { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  if (!(await isPasswordMatched(payload?.password, user?.password as string)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    email: user?.email as string,
    name: user?.name as string,
    photoURL: user?.photoURL as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expiry as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expiry as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const verifiedToken = verifyToken(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = verifiedToken;

  // checking if the user is exist
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    name: user.name as string,
    email: user.email as string,
    photoURL: user?.photoURL as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expiry as string
  );

  return { accessToken };
};

const validateToken = async (token: string) => {

  const verifiedToken = verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { email } = verifiedToken;

  // checking if the user is exist
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  return verifiedToken;
};


export const AuthServices = {
  loginUser,
  refreshToken,
  validateToken,
};
