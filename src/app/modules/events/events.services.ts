/* eslint-disable prefer-const */
import TEvent from "./events.interface";
import { EventModel } from "./events.model";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subWeeks,
} from "date-fns";

const createEventIntoDB = async (payload: TEvent) => {
  const result = EventModel.create([payload]);
  return result;
};

const getAllEventsFromDB = async (intialQuery: Record<string, string>) => {
  const { search, dateFilter } = intialQuery;
  const now = new Date().toISOString();

  let finalQuery: Record<string, unknown> = {};
  if (search) finalQuery.eventTitle = { $regex: search, $options: "i" };
  if (dateFilter) {
    switch (dateFilter.toLowerCase()) {
      case "today":
        finalQuery.dateAndTime = { $gte: startOfDay(now), $lte: endOfDay(now) };
        break;
      case "currentweek":
        finalQuery.dateAndTime = {
          $gte: startOfWeek(now),
          $lte: endOfWeek(now),
        };
        break;
      case "lastweek":
        finalQuery.dateAndTime = {
          $gte: startOfWeek(subWeeks(now, 1)),
          $lte: endOfWeek(subWeeks(now, 1)),
        };
        break;
      case "currentmonth":
        finalQuery.dateAndTime = {
          $gte: startOfMonth(now),
          $lte: endOfMonth(now),
        };
        break;
      case "lastmonth":
        finalQuery.dateAndTime = {
          $gte: startOfMonth(subMonths(now, 1)),
          $lte: endOfMonth(subMonths(now, 1)),
        };
        break;
    }
  }

  const events = await EventModel.find(finalQuery);
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
