import TEvent from "./events.interface";
import { EventModel } from "./events.model";

const createEventIntoDB = async (payload: TEvent) => {
  const result = EventModel.create([payload]);
  return result;
};

const getAllEventsFromDB = async () => {
  const events = await EventModel.find();
  return events;
};

const getEventsByUserEmail = async (email: string) => {
  const events = await EventModel.find({ userEmail: email });
  return events;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getEventsByUserEmail,
};
