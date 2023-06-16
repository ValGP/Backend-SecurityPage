import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Control Backend")
})

app.post('/enviar-correo', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  // Configura el transporter de nodemailer con tus credenciales de correo electrónico
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'intento1valentin@gmail.com',
      pass: 'avpjkujwgedeveyd'
    }
  });

  // Configura los datos del correo electrónico
  const mailOptions = {
    from: 'Prueba 1 intento1valentin@gmail.com',
    to: 'proyectoveele@gmail.com',
    subject: 'Nuevo mensaje del formulario',
    html: `
      <p>Nombre: ${nombre}</p>
      <p>Email: ${email}</p>
      <p>Teléfono: ${telefono}</p>
      <p>Mensaje: ${mensaje}</p>
    `
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.status(200).send('Correo electrónico enviado correctamente');
    }
  });
});

// Inicia el servidor Express en el puerto 3001
app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000');
});
