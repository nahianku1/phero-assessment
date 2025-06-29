import express from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { ZodValidations } from "./user.validation";

export const userRouter = express.Router();

userRouter.post(
  "/create-user",
  validateRequest(ZodValidations.createUserValidation),
  UserControllers.createUser
);


