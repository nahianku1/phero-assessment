"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_services_1 = require("./auth.services");
const sendResponse_1 = require("../../utils/sendResponse");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none", // Adjust as needed
    });
    res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User is logged in successfully!",
        data: {
            accessToken,
        },
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const { accessToken } = yield auth_services_1.AuthServices.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Access token is retrieved successfully!",
        data: accessToken,
    });
}));
const validateToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookies;
    console.log({ accessToken }, 47);
    const result = yield auth_services_1.AuthServices.validateToken(accessToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Access token is validated successfully!",
        data: result,
    });
}));
const expireTokens = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Tokens are expired successfully!",
        data: null,
    });
}));
exports.AuthControllers = {
    loginUser,
    refreshToken,
    validateToken,
    expireTokens,
};
