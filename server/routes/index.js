const express = require("express");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.use("/", require("./userRouter"));
router.use(authentication);
router.use(errorHandler);

module.exports = router;
