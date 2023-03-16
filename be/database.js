const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to the DB".green)
    return true
  } catch (error) {
    console.log(error.message.red)
  }
}

module.exports = connectDB
