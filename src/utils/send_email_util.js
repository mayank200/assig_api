var nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

var smtpTransport= nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,  //use tls not working if set as true, SSL version error
    auth: {
        user: "mayanksha200@gmail.com",
        pass: "20J@n1998",
    },
  });
exports.sendMail  =async function(mail)
    {

    var subject=mail['subject'];
    var data= mail['data'];
    var to_email_id=mail['email']; 
    var template_path=mail['template_path'];
    const filePath = await path.join(__dirname, template_path);  
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);  
    var replacements; 

    if(mail['module_type']=='otp'){
        var replacements = { otp: data };
    }
    if(mail['module_type']=='welcome-mail'){
        var replacements = { user_name: data };
    }
    if(mail['module_type']=='Contact-Us'){
        var replacements = { company_name: mail['companyname'],
        user_name: mail['name'],
        user_email: mail['useremail'],
        user_phone: mail['mobilenumber'] };
    }
    if(mail['module_type']=='Contact_us'){
        var replacements = { 
        user_name: mail['name'],
        user_email: mail['useremail'],
        user_phone: mail['mobilenumber'] };
    }
    if(mail['module_type']=='Applied_job_email'){
        var replacements={
            username:data,
            usercompanyname:mail['company'],
            userjobprofile:mail['JobProfile']
        };
    }
    if(mail['module_type']=='profileregister_notify'){
        // var replacements={username:data}
    }


       
    const htmlToSend = template(replacements);
    var mailOptions = {
        from: {
            name: 'Livee',
            address: 'noreply@livee.com'
        },
        to: to_email_id,
        subject :subject,
        html: htmlToSend // html body
    };
    if(to_email_id==undefined || to_email_id==''){
        return false;
    }
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error)
        {
            return console.log(error);
            //res.status(200).send('Email not sent');
            
        }
        else{
            return info;
        }
    });
};