const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manikanthmani789@gmail.com@gmail.com", // replace with your Gmail
    pass: "vuji jjeu mrlu hxak",    // replace with your App Password
  },
});

exports.sendAppointmentEmail = functions.firestore
  .document("appointments/{docId}")
  .onCreate((snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "manikanthmani789@gmail.com@gmail.com", // same as above
      to: "sss.lasa2022@gmail.com", // where doctor receives mail
      subject: "🩺 New Appointment Booked",
      html: `
        <h2>New Appointment</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Date:</b> ${data.date}</p>
        <p><b>Time:</b> ${data.time}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
