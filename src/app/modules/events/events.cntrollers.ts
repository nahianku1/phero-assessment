import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { EventServices } from "./events.services";

const createEvent = catchAsync(async (req, res) => {
  const result = await EventServices.createEventIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: `Event created successfully!`,
    data: result,
  });
});

export const EventControllers = {
  createEvent,
};
