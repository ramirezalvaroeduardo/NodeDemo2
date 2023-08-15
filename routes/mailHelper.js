const mailLib = require('nodemailer');

const emailTransport = mailLib.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  debug: true,
  auth: {
    user: 'ramirezalvaroeduardo@gmail.com',
    pass: 'hriegkywxrzbybjc'
  }
});


var mailOptions = {
    from: 'mspb@textapp.yotas',
    to: 'laurajeannetteramirezdiaz@gmail.com, ramirezalvaroeduardo@gmail.com, diazjeannette@me.com',
    //subject: 'Test de Node email Lib.',
    //text: 'Esta es la primer prueba de envio de correo electronico.',
    //html: '<h1>Esta es la primer prueba de envío de correo electrónico desde la aplicación .</h1>'
  };

var sendQuestion = function sendQuestion(dSubject, dMessage) {
  mailOptions.subject = dSubject;
  mailOptions.html = '<h2>' + dMessage + '</h2>';
  emailTransport.sendMail(mailOptions, function(err, info){
    if(err) console.log('Error: ]', err, ']');
    else console.log('Email sent [', info.messageId, ']');
  });
  return JSON.stringify(dMessage);
}

module.exports.sendQuestion = sendQuestion;
