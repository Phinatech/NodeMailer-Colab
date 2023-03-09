const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "146999016306-ijr2qc4j4gtm6j6ra2ub4giu8o9v3epj.apps.googleusercontent.com";
const GOOGLE_REFERSHTOKEN =
  "1//04HTsxhCigpQACgYIARAAGAQSNwF-L9IrzbfC1u4ewfjsewspKgaeR8yVKiS33c427ke-5w8hmciFQNCrY2AgnQqZ9AaQkulVdzo";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  "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",
  GOOGLE_REDIRECT,
  "146999016306-ijr2qc4j4gtm6j6ra2ub4giu8o9v3epj.apps.googleusercontent.com"
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFERSHTOKEN });

const signUpEmail = async () => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "samuelolorunda2@gmail.com",
        refreshToken: accessToken.token,
        clientId:
          "146999016306-ijr2qc4j4gtm6j6ra2ub4giu8o9v3epj.apps.googleusercontent.com",
        clientSecret: "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",
        accessToken: GOOGLE_REFERSHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/mail.ejs");

    const data = await ejs.renderFile(buildFile, {});

    const mailOption = {
      from: "Verify your DevBucket Account 🧑‍💻🧑‍💻🧑‍💻 <samuelolorunda2@gmail.com>",
      to: newUser.email,
      subject: "Account Verification",
      html: "data",
    };

    mailTransporter.sendMail(mailOption);
  } catch (error) {
    return error;
  }
};

module.exports = { signUpEmail };
