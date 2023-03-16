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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = require("url");
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    console.log(code);
    const getTokens = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, node_fetch_1.default)("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new url_1.URLSearchParams({
                code: code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: "http://localhost:5173/loginfinished",
                grant_type: "authorization_code",
            }),
        });
        const data = yield response.json();
        return data;
    });
    const { id_token, access_token } = yield getTokens();
    const userData = jsonwebtoken_1.default.decode(id_token);
    const foundUser = yield UserSchema_1.default.findOne({ sub: userData.sub });
    if (!foundUser) {
        const newUser = new UserSchema_1.default({
            sub: userData.sub,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            admin: [],
            member: [],
            access_token: access_token,
        });
        yield newUser.save();
    }
    else {
        yield UserSchema_1.default.findOneAndUpdate({ sub: userData.sub }, {
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            access_token: access_token,
        });
    }
    const user = yield UserSchema_1.default.findOne({ sub: userData.sub });
    const token = jsonwebtoken_1.default.sign({
        id: user === null || user === void 0 ? void 0 : user._id,
        name: userData.name,
        picture: userData.picture,
        email: userData.email,
    }, process.env.JWT_SECRET, { expiresIn: "168h" });
    res.send(token);
}));
exports.default = router;
