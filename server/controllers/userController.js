class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = userControleer;
