import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { EventValidations } from "./events.validation";
import { EventControllers } from "./events.cntrollers";
import auth from "../../middlewares/auth";

export const eventRouter = express.Router();

eventRouter.post(
  "/create-event",
  auth(),
  validateRequest(EventValidations.EventSchema),
  EventControllers.createEvent
);

eventRouter.get("/all-events", auth(), EventControllers.getAllEvents);

eventRouter.get("/my-events", auth(), EventControllers.getAllEventsByUserEmail);

eventRouter.post("/join/:eventId", auth(), EventControllers.joinEvent);

eventRouter.put(
  "/update-event/:eventId",
  auth(),
  validateRequest(EventValidations.updateEventSchema),
  EventControllers.updateEvent
);

eventRouter.delete(
  "/delete-event/:eventId",
  auth(),
  EventControllers.deleteEvent
);
