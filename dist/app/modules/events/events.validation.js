"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidations = void 0;
const zod_1 = require("zod");
const EventSchema = zod_1.z.object({
    eventTitle: zod_1.z
        .string()
        .min(1, { message: "Event title is required" })
        .max(100, { message: "Event title must be 100 characters or less" }),
    name: zod_1.z
        .string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be 50 characters or less" }),
    dateAndTime: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
        required_error: "Date and time is required",
        invalid_type_error: "Invalid date format",
    })),
    location: zod_1.z
        .string()
        .min(1, { message: "Location is required" })
        .max(200, { message: "Location must be 200 characters or less" }),
    description: zod_1.z
        .string()
        .min(1, { message: "Description is required" })
        .max(1000, { message: "Description must be 1000 characters or less" }),
    attendeeCount: zod_1.z
        .number()
        .int({ message: "Attendee count must be an integer" })
        .min(0, { message: "Attendee count must be a non-negative integer" })
        .default(0),
});
const updateEventSchema = EventSchema.partial();
exports.EventValidations = { EventSchema, updateEventSchema };
