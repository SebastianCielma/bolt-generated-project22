const express = require('express');
    const nodemailer = require('nodemailer');
    const cors = require('cors');
    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json({ limit: '10mb' }));

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });

    app.post('/send-email', async (req, res) => {
      const { image, email } = req.body;
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Rysunek od Wikusi',
        text: 'Załączam rysunek',
        attachments: [
          {
            filename: 'drawing.jpg',
            content: image.split(',')[1],
            encoding: 'base64',
          },
        ],
      };

      try {
        await transporter.sendMail(mailOptions);
        res.send({ message: 'Email sent successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error sending email' });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
