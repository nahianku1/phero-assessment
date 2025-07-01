"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorhandler = void 0;
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config/config"));
const errorHandlers_1 = require("../errors/errorHandlers");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
function globalErrorhandler(err, req, res, next) {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: `Something went wrong!`,
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const error = (0, errorHandlers_1.handleZodError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const error = (0, errorHandlers_1.handleMongoValidationError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const error = (0, errorHandlers_1.handleCastError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "MongoServerError" && (err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const error = (0, errorHandlers_1.handleDuplicateError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err === null || err === void 0 ? void 0 : err.stack.includes("E11000")) {
        const error = (0, errorHandlers_1.handleDuplicateError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        err,
        errorSources,
        stack: config_1.default.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
}
exports.globalErrorhandler = globalErrorhandler;
