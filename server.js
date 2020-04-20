const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/send', (req, res) => {
    
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone Number: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
      
    const nodemailer = require("nodemailer");

    async function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS // generated ethereal password
        }
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: "Portfolio Contact", // sender address
        to: "jensenal27@gmail.com", // list of receivers
        subject: "Portfolio Contact Request", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    });

    }

    res.send(200);
    main().catch(console.error);

});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});