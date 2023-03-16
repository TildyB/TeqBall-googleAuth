const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/UserSchema")
require("dotenv").config()

router.post("/", async (req, res) => {
  const code = req.body.code
  const getTokens = async () => {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:5173/loginfinished",
        grant_type: "authorization_code",
      }),
    })
    const data = await response.json()

    return data
  }

  const { id_token, access_token } = await getTokens()
  const userData = jwt.decode(id_token)


  const foundUser = await User.findOne({ sub: userData.sub })
  if (!foundUser) {
    const newUser = new User({
      sub: userData.sub,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      admin: [],
      member: [],
      access_token: access_token,
    })
    await newUser.save()
  } else {
    await User.findOneAndUpdate(
      { sub: userData.sub },
      {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        access_token: access_token,
      }
    )
  }
  
  const user = await User.findOne({ sub: userData.sub })
  const token = jwt.sign(
    {
      id: user._id,
      name: userData.name,
      picture: userData.picture,
      email: userData.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "168h" }
  )

  res.send(token)
})

module.exports = router
