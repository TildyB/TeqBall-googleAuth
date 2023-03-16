const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EventSchema = new Schema({
  end: {
    dateTime: Date
  },
  start: {
    dateTime: Date
  },
  summary: String,
  location: String,
  description: String
}
);

module.exports = mongoose.model("Event", EventSchema)