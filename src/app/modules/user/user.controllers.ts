import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: `User registered successfully!`,
    data: result,
  });
});


export const UserControllers = {
  createUser,

};
