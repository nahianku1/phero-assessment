import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { EventValidations } from "./events.validation";
import { EventControllers } from "./events.cntrollers";

export const eventRouter = express.Router();

eventRouter.post(
  "/create-event",
  validateRequest(EventValidations.EventSchema),
  EventControllers.createEvent
);



