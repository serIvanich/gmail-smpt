const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/*+json' }))

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3010
const smpt_login = process.env.SMTP_LOGIN
const smpt_password = process.env.SMTP_PASSWORD

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
   
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTSL: true,
    auth: {
      user: smpt_login, // generated ethereal user
      pass: smpt_password, // generated ethereal password
    },
  });

app.get('/', (req, res) => {
  res.send('Hello Express!')
})


app.post('/sendMessage', async (req, res) => {

   let {name, email, phone, message} = req.body

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'My Profile 👻', // sender address
    to: 'serivan1108@gmail.com', // list of receivers
    subject: 'Portfolio answer', // Subject line
    //text: "Hello world?", // plain text body
    html: `<b>The person watched your PORTFOLIO and he sent you a message</b>
    <div>
      from: ${name}  
    </div>
    <div>
      contact email: ${email} phone: ${phone}
    </div>
    <div>
      message: ${message}
    </div>`, // html body
  });

  res.send('ok');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})