import { TUser } from "./user.interfaces";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = UserModel.create([payload]);
  return result;
};



export const UserServices = {
  createUserIntoDB,
};
