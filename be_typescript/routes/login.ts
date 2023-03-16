import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import User, { IUser } from "../models/UserSchema";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const code: string = req.body.code;
  console.log(code);
  const getTokens = async () => {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        redirect_uri: "http://localhost:5173/loginfinished",
        grant_type: "authorization_code",
      }),
    });
    const data = await response.json();
    return data;
  };

  const { id_token, access_token } = await getTokens();
  const userData: { sub: string; email: string; name: string; picture: string } =
    jwt.decode(id_token) as { sub: string; email: string; name: string; picture: string };

  const foundUser: IUser | null = await User.findOne({ sub: userData.sub });
  if (!foundUser) {
    const newUser = new User({
      sub: userData.sub,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      admin: [],
      member: [],
      access_token: access_token,
    });
    await newUser.save();
  } else {
    await User.findOneAndUpdate(
      { sub: userData.sub },
      {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        access_token: access_token,
      }
    );
  }

  const user = await User.findOne({ sub: userData.sub });
  const token = jwt.sign(
    {
      id: user?._id,
      name: userData.name,
      picture: userData.picture,
      email: userData.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "168h" }
  );

  res.send(token);
});

export default router;
