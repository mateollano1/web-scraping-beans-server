const nodemailer = require("nodemailer");
const pug = require('pug');
var path = require("path");

sendMail = async(errorMessage) => {
    let d = new Date();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "arrendamientosnjs@gmail.com",
            pass: "appempresariales" // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const compiledFunction = pug.compileFile(path.resolve("./") + '/src/views/mail.pug');
    let info = await transporter.sendMail({
        from: '"Bean Project" <arrendamientosnjs@gmail.com>', // sender address
        to: "mateo.llano1@gmail.com", // list of receivers
        subject: `Problema recolección de datos`, // Subject line
        html: compiledFunction({
            error: errorMessage,
            fecha: d

        })

    });

    transporter.sendMail(info, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}
module.exports = { sendMail }