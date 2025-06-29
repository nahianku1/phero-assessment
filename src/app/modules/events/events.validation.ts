import { z } from "zod";

const EventSchema = z.object({
    eventTitle: z
        .string()
        .min(1, { message: "Event title is required" })
        .max(100, { message: "Event title must be 100 characters or less" }),
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be 50 characters or less" }),
    dateAndTime: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
        z.date({ required_error: "Date and time is required", invalid_type_error: "Invalid date format" })
    ),
    location: z
        .string()
        .min(1, { message: "Location is required" })
        .max(200, { message: "Location must be 200 characters or less" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(1000, { message: "Description must be 1000 characters or less" }),
    attendeeCount: z
        .number()
        .int({ message: "Attendee count must be an integer" })
        .min(0, { message: "Attendee count must be a non-negative integer" })
        .default(0),
});

export const EventValidations = { EventSchema };
