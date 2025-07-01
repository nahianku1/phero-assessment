"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    eventTitle: {
        type: String,
        required: [true, "Event title is required"],
        maxlength: [100, "Event title must be 100 characters or less"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [50, "Name must be 50 characters or less"],
        trim: true,
    },
    dateAndTime: {
        type: Date,
        required: [true, "Date and time are required"],
        validate: {
            validator: (value) => {
                if (value instanceof Date)
                    return true;
                return false;
            },
            message: "Invalid date format, expected Date or YYYY-MM-DDTHH:mm:ss",
        },
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        maxlength: [200, "Location must be 200 characters or less"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [1000, "Description must be 1000 characters or less"],
        trim: true,
    },
    attendeeCount: {
        type: Number,
        required: true,
        min: [0, "Attendee count must be a non-negative integer"],
        default: 0,
    },
    userEmail: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
    },
    joins: {
        type: [String], // Updated to array of strings
        required: true, // Kept required, but consider if empty array is valid
        default: [], // Default to empty array
    },
}, {
    timestamps: true,
});
exports.EventModel = (0, mongoose_1.model)("Event", EventSchema);
