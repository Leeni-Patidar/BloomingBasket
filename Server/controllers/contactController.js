const nodemailer = require("nodemailer")

const contactFormHandler = async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill in all required fields." })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    })

    const mailOptions = {
      from: `"Contact Form" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Email send error:", error)
    res.status(500).json({ success: false, message: "Failed to send message. Try again later." })
  }
}

module.exports = { contactFormHandler }
