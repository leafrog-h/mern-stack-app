const express = require("../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express");
const router = express.Router();
const bcrypt = require("../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/bcrypt");

const User = require("../../models/user_schema");

// for signup validation and save data to db
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ errorMessage: "email not registered" }); // err.response from client
  try {
    if (await bcrypt.compare(req.body.password, user.password))
      res.status(201).json(user);
    res.status(400).json({ isPwdCorrect: false }); // err.response from client
  } catch (error) {
    res.status(500).json({ serverError: "error from server" }); //err.reponse from server
    console.log(error);
  }
});

module.exports = router;
