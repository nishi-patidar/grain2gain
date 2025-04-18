import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    // Create a transporter using your SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL, // Your Gmail address
        pass: process.env.SMTP_PASSWORD, // App password (not your Gmail password)
      },
    });

    // Email content
    const mailOptions = {
      from: `"NGO Portal" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
