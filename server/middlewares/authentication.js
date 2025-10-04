const { User } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw { name: "Unauthorized", message: "Invalid token" };

    const rawToken = authorization.split(" ");

    if (!rawToken[1] || rawToken[0] !== "Bearer")
      throw { name: "Unauthorized", message: "Invalid token" };

    let payload;
    try {
      payload = verifyToken(rawToken[1]);
    } catch (error) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const user = await User.findOne({ where: { id: payload.id } });

    if (!user) throw { name: "Not Found", message: "User not found" };

    req.user = { userId: user.id };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
