const express = require("express")
const router = express.Router()
const Team = require("../models/TeamSchema")
const User = require("../models/UserSchema")
const Event = require("../models/EventSchema")
const verifyToken = require("../middlewares/verifyToken")
require("dotenv").config()

router.get("/:id", verifyToken, async (req, res) => {
  const teamId = req.params.id
  const eventIds = await Team.findById(teamId).select("events")
  const events = await Event.find({ _id: { $in: eventIds.events } })
  res.json(events)
})

router.post("/", verifyToken, async (req, res) => {
  const { event, id } = req.body
  const newEvent = await Event.create(event)
  const team = await Team.findByIdAndUpdate(
    id,
    { $push: { events: newEvent._id } },
    { new: true }
  )
  const userId = res.locals.user
  const user = await User.findById(userId)
  const API_KEY = process.env.API_KEY
  const sendEventToCalendar = async () => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(event),
      }
    )
    const data = await response.json()
    return data
  }
  await sendEventToCalendar()
  res.sendStatus(200)
})

router.post("/addtocalendar",verifyToken,async(req,res)=>{
  const eventId = req.body.id
  const event = await Event.findById({_id:eventId})

  const userId = res.locals.user
  const user = await User.findById(userId)
  const API_KEY = process.env.API_KEY
  const sendEventToCalendar = async () => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(event),
      }
    )
    return response
  }
 
  const response = await sendEventToCalendar()
  if(!response.ok) return res.status(400).json(" NOT OK")
  return res.status(200).json("OK")
})

module.exports = router
