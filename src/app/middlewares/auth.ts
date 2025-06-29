import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config/config";
import { UserModel } from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {accessToken} = req.cookies;

    // checking if the token is missing
    if (!accessToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const verifiedToken = verifyToken(
      accessToken,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email } = verifiedToken;

    // checking if the user is exist
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }

    req.user = verifiedToken;
    next();
  });
};

export default auth;
