import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { EventServices } from "./events.services";

const createEvent = catchAsync(async (req, res) => {
  const { email } = req.user;
  const payload = { ...req.body, userEmail: email };
  const result = await EventServices.createEventIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: `Event created successfully!`,
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Events retrieved successfully!",
    data: result,
  });
});

const getAllEventsByUserEmail = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await EventServices.getEventsByUserEmail(email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Events retrieved successfully by user email!",
    data: result,
  });
});

const joinEvent = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { eventId } = req.params;
  const result = await EventServices.joinEventIntoEventDB(eventId, email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Joined event successfully!",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const updatedData = req.body;
  const result = await EventServices.updateEventIntoDB(eventId, updatedData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Event updated successfully!",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const result = await EventServices.deleteEventFromDB(eventId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Event deleted successfully!",
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getAllEventsByUserEmail,
  joinEvent,
  updateEvent,
  deleteEvent,
};
