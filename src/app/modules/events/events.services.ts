/* eslint-disable prefer-const */
import TEvent from "./events.interface";
import { EventModel } from "./events.model";
import mongoose from "mongoose";
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

const getAllEventsFromDB = async (initialQuery: Record<string, string>) => {
  const { search, dateFilter, specificDate } = initialQuery;
  const now = new Date().toISOString();

  let finalQuery: Record<string, unknown> = {};
  if (search) finalQuery.eventTitle = { $regex: search, $options: "i" };
  if (specificDate) {
    const date = new Date(specificDate);
    if (!isNaN(date.getTime())) {
      finalQuery.dateAndTime = { $gte: startOfDay(date), $lte: endOfDay(date) };
    }
  } else if (dateFilter) {
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

  console.log(finalQuery);

  const events = await EventModel.find(finalQuery);
  return events;
};

const getEventsByUserEmail = async (email: string) => {
  const events = await EventModel.find({ userEmail: email });
  return events;
};

const joinEventIntoEventDB = async (eventId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Add userId to joins array if not present and increment attendeeCount by 1
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventId, joins: { $ne: userId } }, // only update if userId not already joined
      {
        $addToSet: { joins: userId },
        $inc: { attendeeCount: 1 },
      },
      { new: true, session }
    );

    // If user already joined, just return the event without incrementing
    if (!updatedEvent) {
      const event = await EventModel.findById(eventId).session(session);
      await session.commitTransaction();
      session.endSession();
      return event;
    }

    await session.commitTransaction();
    session.endSession();
    return updatedEvent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateEventIntoDB = async (
  eventId: string,
  updateData: Partial<TEvent>
) => {
  const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, {
    new: true,
  });
  return updatedEvent;
};

const deleteEventFromDB = async (eventId: string) => {
  const deletedEvent = await EventModel.findByIdAndDelete(eventId);
  return deletedEvent;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getEventsByUserEmail,
  joinEventIntoEventDB,
  updateEventIntoDB,
  deleteEventFromDB,
};
