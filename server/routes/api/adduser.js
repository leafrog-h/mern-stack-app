const express = require("../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express");
const router = express.Router();
const bcrypt = require("../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/bcrypt");

const User = require("../../models/user_schema");

// for login validation
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const isEmailTaken = await User.find(email);
  if (isEmailTaken) res.status(400).json({ isEmailTaken: true }); // client error
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password, salt);
    const createdUser = await new User(email, hashedpwd);
    await createdUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ serverError: "fail to add a user" }); // server error
  }
});
module.exports = router;
