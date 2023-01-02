import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const CLIENT_ID ='client id'
const CLEINT_SECRET = 'clicent secret';
const REDIRECT_URI = 'put your redirect_URI';
const REFRESH_TOKEN = 'put your refresh token';

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLEINT_SECRET,REDIRECT_URI);
OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'Put your sender mail ',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    
      const fileAttachments = [
        {
          filename: 'ajaa.txt',
          content: 'This filljbwfbwbew',
        },
        {
          filename: 'black.jpg',
          path:"E:/mailsender/black.jpg",
        },
      ]
    const mailOptions = {
      from: 'Abhishek <put your sender email>',
      // cc:'put multiple receiver id seperate with ',' ',
      to:'put receiver mail id',
      subject: 'Hello from gmail using API',
      // text: 'kl ke liya pdh liya',
      html: '<h1 style="color:red">testing............</h1><br st>phone:9u2398772838278<p style="color: #00FFFF; font-family:sans-serif; font-size: 18px; font-weight: 500; line-height: 32px; margin: 0 0 24px;">Please open file or photo</p>',
      attachments: fileAttachments,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));