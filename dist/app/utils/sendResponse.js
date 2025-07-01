"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
function sendResponse(res, data) {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
}
exports.sendResponse = sendResponse;
