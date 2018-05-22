
var port = process.env.PORT || 4027;
var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var wellknown = require('nodemailer-wellknown');
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.urlencoded({extended:true}));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {user:'fviclass@gmail.com',
  pass: 'fviclass2017'
}
});


app.use(function(req, res, next){

//website you wish to allow to connect  (change second parameter to http://localhost/4027)
  res.setHeader('Access-Control-Allow-Origin', 'http://fvi-grad.com:4027/');

//Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'Post');

// //Request headers you wish to allow
// res.setHeader('Access-Control-Allow-Headers', 'X-Request-With, content-type');

// //Set to true if you need the website to include cookies in the requests sent
// //to the API (eg. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);

//Pass to next layer of middleware
next();


});

app.get('/', function (req, res) {
  let form =`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:4027/" method="POST">
        <input type="text" name ="from">
        <input type="text" name= "to">
        <input type="text" name= "subject">
    
        <button type = "submit">Submit</button>
    </form>
    
</body>
</html>`
  
  res.end(form)
})

app.post('/', function(req, res){

// console.log('working');

  /*  
  Here is where i need to put code to insert student-generated html
  */

  var emailBody = fs.readFileSync('./resume.html');
  emailBody = emailBody;
  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    html: emailBody,
    subject: req.body.subject
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
      message = "Something went wrong";
    } else {
      console.log('Message sent' + info.response);
      res.end("Email sent to:" + mailOptions.dest_email + 
      ".Response:\n" + info.response);
    }
  })
});

app.listen(port, function(err){
  if(err) throw err;

  console.log('listening on port' + port)
})