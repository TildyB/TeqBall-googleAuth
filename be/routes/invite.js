const express = require("express")
const router = express.Router()
const User = require("../models/UserSchema")
const verifyToken = require("../middlewares/verifyToken")

router.post("/",verifyToken, async (req, res) => {
  const {id,userEmail} = req.body
  const user = await User.findOne({ email: userEmail })
  if (!user) return res.status(400).json("Error")

  const teamIds = user.member.map(member => member.teamId)
  if (teamIds.includes(id)) return res.status(402).json("Error")

  const updateUser = await User.findByIdAndUpdate(user._id, {$push: {member: {teamId: id, admin: false, accepted: false}}}, {new: true})
  return res.status(200).json("User invited")
})

module.exports = router