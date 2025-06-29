import TEvent from "./events.interface";
import { EventModel } from "./events.model";

const createEventIntoDB = async (payload: TEvent) => {
  const result = EventModel.create([payload]);
  return result;
};

export const EventServices = {
  createEventIntoDB,
};