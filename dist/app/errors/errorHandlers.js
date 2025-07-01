"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = exports.handleCastError = exports.handleMongoValidationError = exports.handleZodError = void 0;
const handleZodError = (err) => {
    const statusCode = 400;
    const message = `Zod validation Error!`;
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue.path.at(-1),
            message: issue.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleZodError = handleZodError;
const handleMongoValidationError = (err) => {
    const statusCode = 400;
    const message = `Mongoose validation Error!`;
    const errorSources = Object.values(err.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleMongoValidationError = handleMongoValidationError;
const modifiedCastError = (msg) => {
    return msg.split(`(`)[0].replace(/"([^"]+)"/g, "$1");
};
const handleCastError = (err) => {
    const statusCode = 400;
    const message = `Mongoose Cast Error!`;
    // Cast to ObjectId failed for value \"fghfghfgh\"
    const errorSources = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: modifiedCastError(err === null || err === void 0 ? void 0 : err.message),
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleCastError = handleCastError;
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: `Mongoose unique value error!`,
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
