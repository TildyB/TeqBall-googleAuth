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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const login_1 = __importDefault(require("./routes/login"));
// import teamRoute from "./routes/team";
// import eventRoute from "./routes/event";
// import inviteRoute from "./routes/invite";
// import userRoute from "./routes/user";
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/login", login_1.default);
// app.use("/api/team", teamRoute);
// app.use("/api/event", eventRoute);
// app.use("/api/invite", inviteRoute);
// app.use("/api/user", userRoute);
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const isConnected = yield (0, database_1.default)();
    if (isConnected)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`.cyan));
});
init();
