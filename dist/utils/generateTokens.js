"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "uv23adfn!$*fds8";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "afbd732NDOs234";
const createAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    });
};
exports.createRefreshToken = createRefreshToken;
