// apps/api/register.js
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Generate a unique verification token
    const verificationToken = uuidv4();

    // Store the token and user data in your database
    // Send a verification email to the user
    const transporter = nodemailer.createTransport({
      // Configure your email provider (e.g., Gmail)
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://your-app-url/verify/${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send verification email" });
      } else {
        // Save the verification token and user data in the database
        res.status(200).json({ message: "Registration successful" });
      }
    });
  }
}
