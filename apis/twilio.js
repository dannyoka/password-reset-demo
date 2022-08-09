const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendTextWithToken = async (token, phoneNumber) => {
  const message = await client.messages.create({
    body: `Your password reset token is ${token}`,
    to: phoneNumber,
    from: process.env.PHONE_NUMBER,
  });
  console.log(`Message ${message.sid} was sent successfully`);
};

module.exports = { sendTextWithToken };
