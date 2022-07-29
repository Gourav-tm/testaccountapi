import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

/* export const sendMail = async option => {
    //create a transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "2166b35e300b8d",
            pass: "2e5dcf28b6937c"
        }
    });

    let readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
               callback(err); 
               throw err;
                
            }
            else {
                callback(null, html);
            }
        });
    };
    readHTMLFile(__dirname + 'public/assests/email-login-template.html', function(err, html) {
        var template = Handlebars.compile(html);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: 'Gourav Jhangikhel <gourav.j@gmail.com>',
            to: option.email,
            subject: option.subject,
            message: option.message
        }
         transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });
   

    //const result = await transporter.sendMail(mailOptions);
} */

export async function sendMail(option) {
  const filePath = path.join(
    __dirname,
    '../../public/assests/email-login-template.html',
  );

  console.log(filePath);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  /* const replacements = {
      username: "Umut YEREBAKMAZ"
    }; */
  const htmlToSend = template(option.html);
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '2166b35e300b8d',
      pass: '2e5dcf28b6937c',
    },
  });

  const mailOptions = {
    from: 'Gourav Jhangikhel <gourav.j@gmail.com>',
    to: option.email,
    subject: option.subject,
    message: option.message,
    html: htmlToSend,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', 'https://mailtrap.io/inboxes/test/messages/');
}
