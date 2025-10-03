const { verify } = require("jsonwebtoken");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw { name: "Unauthorized", messsage: "Invalid token" };

    const rawToken = authorization.split(" ");

    if (!rawToken[1] || rawToken[0] !== "Bearer")
      throw { name: "Unauthorized", messsage: "Invalid token" };

    let payload;
    try {
      payload = verify(rawToken[1]);
    } catch (error) {
      throw { name: "Unauthorized", messsage: "Invalid token" };
    }

    const user = await User.findOne({ where: { id: payload.id } });

    if (!user) throw { name: "Not Found", messsage: "User not found" };

    req.user = { userId: user.id };

    next();
  } catch (error) {
    next();
  }
};

module.exports = authentication;
