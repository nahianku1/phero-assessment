"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const events_validation_1 = require("./events.validation");
const events_cntrollers_1 = require("./events.cntrollers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
exports.eventRouter = express_1.default.Router();
exports.eventRouter.post("/create-event", (0, auth_1.default)(), (0, validateRequest_1.validateRequest)(events_validation_1.EventValidations.EventSchema), events_cntrollers_1.EventControllers.createEvent);
exports.eventRouter.get("/all-events", (0, auth_1.default)(), events_cntrollers_1.EventControllers.getAllEvents);
exports.eventRouter.get("/my-events", (0, auth_1.default)(), events_cntrollers_1.EventControllers.getAllEventsByUserEmail);
exports.eventRouter.post("/join/:eventId", (0, auth_1.default)(), events_cntrollers_1.EventControllers.joinEvent);
exports.eventRouter.put("/update-event/:eventId", (0, auth_1.default)(), (0, validateRequest_1.validateRequest)(events_validation_1.EventValidations.updateEventSchema), events_cntrollers_1.EventControllers.updateEvent);
exports.eventRouter.delete("/delete-event/:eventId", (0, auth_1.default)(), events_cntrollers_1.EventControllers.deleteEvent);
