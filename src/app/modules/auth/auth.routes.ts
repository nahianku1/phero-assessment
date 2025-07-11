import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";

export const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

authRouter.post("/validate-token", AuthControllers.validateToken);
authRouter.post("/refresh-token", AuthControllers.refreshToken);
authRouter.post("/expire-token", AuthControllers.expireTokens);
