"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    sub: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    email: String,
    picture: String,
    member: [{ teamId: String, admin: Boolean, accepted: Boolean }],
    access_token: String,
});
exports.default = mongoose_1.default.model("User", UserSchema);
