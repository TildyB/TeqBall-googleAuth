const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  picture: String,
  member: [{teamId: String, admin: Boolean, accepted: Boolean}],
  access_token: String,
});

  module.exports = mongoose.model("User", UserSchema)