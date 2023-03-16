const express = require("express")
const router = express.Router()
const Team = require("../models/TeamSchema")
const User = require("../models/UserSchema")
const verifyToken = require("../middlewares/verifyToken")
require("dotenv").config()

router.get("/", verifyToken, async (req, res) => {
  const userId = res.locals.user
  const user = await User.findById(userId)
  const memberIds = user.member.map(m => m.teamId)
  const teams = await Team.find({ _id: { $in: memberIds } })
  const combinedData = user.member.map(member => {
    const team = teams.find(x => x._id == member.teamId)
    return { member, name: team.name, events: team.events.length }
  })
  res.json(combinedData)
})

router.get("/:id", verifyToken, async (req, res) => {
  const teamId = req.params.id
  const userId = res.locals.user
  const user = await User.findById(userId)
  const isAdmin = user.member.find(m => m.teamId == req.params.id).admin
  const team = await Team.findById(teamId)
  res.json({isAdmin, team})
})

router.post("/", verifyToken, async (req, res) => {
  const { teamName } = req.body
  const newTeam = new Team({ name: teamName, events: [] })
  const team = await newTeam.save()
  const user = await User.findByIdAndUpdate(res.locals.user, {$push: {member: {teamId: team._id, admin: true, accepted: true}}}, {new: true})
  res.sendStatus(200)
})

router.post("/members", verifyToken, async (req, res) => {
  const id = req.body.id
  const members  =await User.find({"member.teamId":  id})
  res.send(members)
})

module.exports = router
