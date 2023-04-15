const cors = require("cors")({ origin: "https://remoteracer.fun" });

const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
// const rateLimit = require("express-rate-limit");

// const loginRateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 dakot
//   max: 5,
//   message: `Try again later`,
//   statusCode: 429,
//   headers: true,
// });

exports.sendVerification = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = req.body.data;
    const msg = {
      to: data.email,
      from: "reactprojnoreply@gmail.com",
      subject: "[Verification email - REMOTERACER]",
      text: "hello",
      html: `<div style = "background-color:#ffe500; padding-top:25px; padding-bottom: 25px"> <h1 style = "color:black; text-align:center;"> REMOTE RACER </h1> <h2 style = "color:black; text-align:center;"> Hello, ${data.email}, here is a verification code in order to finish the sign up step - ${data.codemessage}</h2></div>`,
    };
    sgMail.setApiKey(process.env.SG_API_KEY);
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.send({ result: "ok" });
      })
      .catch((error) => {
        console.error(error);
        res.send({ result: error });
      });
  });
});

exports.sendSuccess = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = req.body.data;
    const msgSuccess = {
      to: data.email,
      from: "reactprojnoreply@gmail.com",
      subject: "[Welcome email - REMOTERACER]",
      text: "hello",
      html: `<div style = "border-radius:10px; background-color:#ffe500; padding-top:25px; padding-bottom:25px;"> <h1 style = "color:black; margin: 5px auto;"> Hello dear customer! Thanks for signing up on our website! </h1> <h2 style = "color:black;margin: 5px auto;"> Registered with ${data.email} </h2> </div>`,
    };
    sgMail.setApiKey(process.env.SG_API_KEY);
    sgMail
      .send(msgSuccess)
      .then(() => {
        console.log("Email sent");
        res.send({ result: "ok" });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
