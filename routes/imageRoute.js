const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

router.get("/reddit.png", forwardAuthenticated, (req, res) => {res.sendFile("/images/reddit.png")});

module.exports = router;