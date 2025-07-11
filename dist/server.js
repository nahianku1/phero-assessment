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
/* eslint-disable no-console */
const mongoose_1 = require("mongoose");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config/config"));
let server;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(config_1.default.db_url);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Server: http://localhost:${Number(config_1.default.port)}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log(`unhandledRejection is detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log(err);
    console.log(`uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield run();
}))();
