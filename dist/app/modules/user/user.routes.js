"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/create-user", (0, validateRequest_1.validateRequest)(user_validation_1.ZodValidations.createUserValidation), user_controllers_1.UserControllers.createUser);
