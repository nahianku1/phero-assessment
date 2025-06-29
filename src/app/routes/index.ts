import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
