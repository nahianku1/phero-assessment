"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const events_model_1 = require("./events.model");
const mongoose_1 = __importDefault(require("mongoose"));
const date_fns_1 = require("date-fns");
const createEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = events_model_1.EventModel.create([payload]);
    return result;
});
const getAllEventsFromDB = (initialQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, dateFilter, specificDate } = initialQuery;
    const now = new Date().toISOString();
    let finalQuery = {};
    if (search)
        finalQuery.eventTitle = { $regex: search, $options: "i" };
    if (specificDate) {
        const date = new Date(specificDate);
        if (!isNaN(date.getTime())) {
            finalQuery.dateAndTime = { $gte: (0, date_fns_1.startOfDay)(date), $lte: (0, date_fns_1.endOfDay)(date) };
        }
    }
    else if (dateFilter) {
        switch (dateFilter.toLowerCase()) {
            case "today":
                finalQuery.dateAndTime = { $gte: (0, date_fns_1.startOfDay)(now), $lte: (0, date_fns_1.endOfDay)(now) };
                break;
            case "currentweek":
                finalQuery.dateAndTime = {
                    $gte: (0, date_fns_1.startOfWeek)(now),
                    $lte: (0, date_fns_1.endOfWeek)(now),
                };
                break;
            case "lastweek":
                finalQuery.dateAndTime = {
                    $gte: (0, date_fns_1.startOfWeek)((0, date_fns_1.subWeeks)(now, 1)),
                    $lte: (0, date_fns_1.endOfWeek)((0, date_fns_1.subWeeks)(now, 1)),
                };
                break;
            case "currentmonth":
                finalQuery.dateAndTime = {
                    $gte: (0, date_fns_1.startOfMonth)(now),
                    $lte: (0, date_fns_1.endOfMonth)(now),
                };
                break;
            case "lastmonth":
                finalQuery.dateAndTime = {
                    $gte: (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 1)),
                    $lte: (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 1)),
                };
                break;
        }
    }
    console.log(finalQuery);
    const events = yield events_model_1.EventModel.find(finalQuery);
    return events;
});
const getEventsByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield events_model_1.EventModel.find({ userEmail: email });
    return events;
});
const joinEventIntoEventDB = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Add userId to joins array if not present and increment attendeeCount by 1
        const updatedEvent = yield events_model_1.EventModel.findOneAndUpdate({ _id: eventId, joins: { $ne: userId } }, // only update if userId not already joined
        {
            $addToSet: { joins: userId },
            $inc: { attendeeCount: 1 },
        }, { new: true, session });
        // If user already joined, just return the event without incrementing
        if (!updatedEvent) {
            const event = yield events_model_1.EventModel.findById(eventId).session(session);
            yield session.commitTransaction();
            session.endSession();
            return event;
        }
        yield session.commitTransaction();
        session.endSession();
        return updatedEvent;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateEventIntoDB = (eventId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEvent = yield events_model_1.EventModel.findByIdAndUpdate(eventId, updateData, {
        new: true,
    });
    return updatedEvent;
});
const deleteEventFromDB = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedEvent = yield events_model_1.EventModel.findByIdAndDelete(eventId);
    return deletedEvent;
});
exports.EventServices = {
    createEventIntoDB,
    getAllEventsFromDB,
    getEventsByUserEmail,
    joinEventIntoEventDB,
    updateEventIntoDB,
    deleteEventFromDB,
};
