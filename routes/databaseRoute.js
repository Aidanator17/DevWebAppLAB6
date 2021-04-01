const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get("/users", async (req,res) => {

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          method: true,
          role: true
        }
      })
      return res.json(users)
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" })
    }
  })

module.exports = router;