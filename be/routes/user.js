const express = require("express")
const router = express.Router()
const User = require("../models/UserSchema")
const verifyToken = require("../middlewares/verifyToken")

router.post("/join", verifyToken, async (req, res) => {
  const userId = res.locals.user
  const teamId = req.body.teamId
  const user = await User.findById(userId)
  const foundTeam = user.member.find((team) => team.teamId == teamId)
  if (foundTeam) {
    foundTeam.accepted = true
    await user.save()
    return res.status(200).json("Ok")
  } else {
    return res.status(400).json("Error")
  }
})

router.post("/makeadmin", verifyToken, async (req, res) => {
    const userId = req.body.userId
    const teamId= req.body.id
    const user = await User.findById(userId)
    const foundTeam = user.member.find((team) => team.teamId == teamId)
    if (foundTeam) {
      foundTeam.admin = true
      await user.save()
      return res.status(200).json("Ok")
    } else {
      return res.status(400).json("Error")
    }
})

module.exports = router