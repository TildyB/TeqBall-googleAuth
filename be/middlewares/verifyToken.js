const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"]
  if (!header) return res.status(401)
  const token = header.split(" ")[1]
  if (!token) return res.status(401)
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401)
    console.log(res.locals.user)
    res.locals.user = decoded?.id
    next()
  })
}

module.exports = verifyToken
