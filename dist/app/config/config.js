"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_token_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    node_env: process.env.NODE_ENV,
};
