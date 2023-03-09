const { Router } = require("express");
const { signUpUser } = require("./controller");

const router = Router();

router.route("/signUpUser").post(signUpUser);

module.exports = router;
