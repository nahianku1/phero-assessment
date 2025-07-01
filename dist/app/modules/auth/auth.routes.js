"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controllers_1.AuthControllers.loginUser);
exports.authRouter.post("/validate-token", auth_controllers_1.AuthControllers.validateToken);
exports.authRouter.post("/refresh-token", auth_controllers_1.AuthControllers.refreshToken);
exports.authRouter.post("/expire-token", auth_controllers_1.AuthControllers.expireTokens);
