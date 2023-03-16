import express, { Express, Request, Response } from 'express';
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database";

import loginRoute from "./routes/login";
// import teamRoute from "./routes/team";
// import eventRoute from "./routes/event";
// import inviteRoute from "./routes/invite";
// import userRoute from "./routes/user";

const app : Express = express();
const port = process.env.PORT;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoute);
// app.use("/api/team", teamRoute);
// app.use("/api/event", eventRoute);
// app.use("/api/invite", inviteRoute);
// app.use("/api/user", userRoute);

const init = async () => {
  const isConnected = await connectDB();
  if (isConnected) app.listen(port, () => console.log(`Example app listening on port ${port}!`.cyan));
};

init();