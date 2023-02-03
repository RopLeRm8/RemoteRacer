// Node.js/Express server
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail')
const app = express();
const cors = require('cors');
const port = 6969;
const rateLimit = require('express-rate-limit')
require('dotenv').config();
if (!process.env.NODE_ENV) {
  require('dotenv').config();
}
const SENDGRID_API_KEY= process.env.SENDGRID_API_KEY;

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakot
  max: 5,
  message: `Try again later`, 
  statusCode: 429,
  headers: true,
});


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors({ origin: ['http://localhost:3000'] }));

sgMail.setApiKey(SENDGRID_API_KEY)

app.post('/send-verification', loginRateLimiter, (req, res) => {
  const msg = {
    to: req.body.email, 
    from: 'reactprojnoreply@gmail.com',
    subject: '[Verification email - REMOTERACER]',
    text: 'hello',
    html: `<div style = "background-color:#ffe500; padding-top:25px; padding-bottom: 25px"> <h1 style = "color:black; text-align:center;"> REMOTE RACER </h1> <h2 style = "color:black; text-align:center;"> Hello, ${req.body.email}, here is a verification code in order to finish the sign up step - ${req.body.codemessage}</h2></div>`,
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
    res.send({ result: "ok" });
  })
  .catch((error) => {
    console.error(error)
  })

  
})
app.post('/send-success', loginRateLimiter, (req, res) => {
  const msgSuccess = {
    to: req.body.email, 
    from: 'reactprojnoreply@gmail.com',
    subject: '[Welcome email - REMOTERACER]',
    text: 'hello',
    html: `<div style = "border-radius:10px; background-color:#ffe500; padding-top:25px; padding-bottom:25px;"> <h1 style = "color:black; margin: 5px auto;"> Hello dear customer! Thanks for signing up on our website! </h1> <h2 style = "color:black;margin: 5px auto;"> Registered with ${req.body.email} </h2> </div>`,
  }
  sgMail
  .send(msgSuccess)
  .then(() => {
    console.log('Email sent')
    res.send({ result: "ok" });
  })
  .catch((error) => {
    console.error(error)
  })

  
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));