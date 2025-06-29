import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config/config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: config.node_env === "production",
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
    secure: config.node_env === "production",
    httpOnly: true,
  });
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Access token is retrieved successfully!",
    data: accessToken,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
