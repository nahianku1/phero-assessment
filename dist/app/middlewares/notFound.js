"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
function notFound(req, res) {
    res.status(500).json({
        success: false,
        message: "Route not found!",
    });
}
exports.notFound = notFound;
