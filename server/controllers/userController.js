const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        throw { name: "Unauthorized", message: "Invalid email or password" };

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword)
        throw { name: "Unauthorized", message: "Invalid email or password" };

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
