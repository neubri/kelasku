const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "rahasia";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(payload) {
  return jwt.verify(payload, JWT_SECRET);
}

module.exports = { signToken, verifyToken };
