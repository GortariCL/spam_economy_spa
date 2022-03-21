const indicadoresEc = require('./consultas');
//Requerimiento 1
const nodemailer = require('nodemailer');
let indicador = '';

indicadoresEc().then((res) => {
    indicador = `<ul><li>El valor del dolar el dia de hoy es: ${res.dolar}</li>
    <li>El valor del euro el dia de hoy es: ${res.euro}
    <li>El valor de la uf el dia de hoy es: ${res.uf}
    <li>El valor de la utm el dia de hoy es: ${res.utm}</li></ul>
    `;
})

//Requerimiento 2
const enviar = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test.nodemailer2022@gmail.com',
                pass: 'node1234',
            },
        });
    
        let mailOptions = {
            from: 'test.nodemailer2022@gmail.com',
            to: `${to}`,
            subject: `${subject}`,
            html: `${text}
            ${indicador}`,
        }
    
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                reject(err);
            } if (data) {
                resolve(data);
            }
        });
    })
}

module.exports = enviar;