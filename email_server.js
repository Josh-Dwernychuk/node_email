var dt = require('./date');
var fs = require('fs');
var http = require('http');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email@email.com',
    pass: 'pass'
  }
});

var mailOptions = {
  from: 'email@email.com',
  to: 'email@email.com',
  subject: 'Email',
  text: 'Body'
};



http.createServer(function (req, res) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data + dt.myDateTime());
    res.end();
  });
}).listen(8080);
