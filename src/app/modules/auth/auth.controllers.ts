import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User is logged in successfully!",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = await AuthServices.refreshToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Access token is retrieved successfully!",
    data: accessToken,
  });
});

const validateToken = catchAsync(async (req, res) => {
  const { accessToken } = req.cookies;

  const result = await AuthServices.validateToken(accessToken);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Access token is validated successfully!",
    data: result,
  });
});

const expireTokens = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Tokens are expired successfully!",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  validateToken,
  expireTokens,
};
