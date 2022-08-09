const { Router } = require("express");
const { User, ResetToken } = require("../models");
const { sendTextWithToken } = require("../apis/twilio");
const bcrypt = require("bcrypt");

const router = Router();

const sendPasswordResetToken = async (email) => {
  // You can generate a token here using random numbers
  const tokenValue = "123456";
  const userData = await User.findOne({ where: { email } });
  const user = userData.get({ plain: true });
  if (userData) {
    const token = await ResetToken.create({
      user_email: email,
      token: tokenValue,
    });
    sendTextWithToken(tokenValue, user.phone_number);
  }
};

router.post("/", async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    phone_number: req.body.phoneNumber,
  });
  res.send(user);
});

router.post("/login", async (req, res) => {
  const userData = await User.findOne({ where: { email: req.body.email } });
  if (userData) {
    const user = userData.get({ plain: true });
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      res.send("password is correct");
      return;
    }
    res.send("invalid password");
    return;
  }
  res.send("No user with that email");
  return;
});

router.post("/forgot-password", async (req, res) => {
  console.log(req.body.email);
  await sendPasswordResetToken(req.body.email);
  res.send("Password reset should have been sent");
});

router.post("/reset-password", async (req, res) => {
  const validToken = await ResetToken.findOne({
    where: { user_email: req.body.email, token: req.body.token },
  });
  if (validToken) {
    await User.update(
      { password: req.body.password },
      { where: { email: req.body.email }, individualHooks: true }
    );
    res.send("Your password has been successfully updated");
    return;
  }
  res.send("invalid token");
});

module.exports = router;
