"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/", routes_1.router);
app.use(notFound_1.notFound);
app.use(globalErrorHandler_1.globalErrorhandler);
exports.default = app;
