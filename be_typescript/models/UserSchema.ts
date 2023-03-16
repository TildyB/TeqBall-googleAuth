import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  sub: string;
  name: string;
  email: string;
  picture: string;
  member: Array<{
    teamId: string;
    admin: boolean;
    accepted: boolean;
  }>;
  access_token?: string;
}

const UserSchema = new mongoose.Schema({
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

export default mongoose.model<IUser>("User", UserSchema);
