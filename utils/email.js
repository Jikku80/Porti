const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const { MailtrapClient } = require('mailtrap');

module.exports = class Email {
    constructor(user, url, token) {
        this.to = [
            {
                email: user.email
            }
        ];
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.token = token;
        this.from = {
            email: "lakheydetech@vporti.com",
            name: "Lakhey De Tech"
        };
    }

    async sendMail(template, subject) {

        const mailtoken = process.env.MAIL_TRAP

        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            token: this.token,
            subject
        });


        const client = new MailtrapClient({ token: mailtoken })
        client.send({
            from: this.from,
            to: this.to,
            subject: subject,
            text: htmlToText.fromString(html),
            category: "In Production"
        })
    }

    async sendWelcome() {
        await this.sendMail('welcome', 'Welcome to Lakhey Family!');
    }

    async sendPasswordReset() {
        let date = new Date();
        let exdate = date.getTime() + 600000;
        exdate = new Date(exdate)
        date = date.toLocaleTimeString();
        let newdate = exdate.toLocaleTimeString();
        await this.sendMail(
            'passwordReset',
            `Your password reset token only valids for 10 min from ${date} to ${newdate}`
        );
    }
}


// module.exports = class Email {
//     constructor(user, url, token) {
//         this.to = user.email;
//         this.firstName = user.name.split(' ')[0];
//         this.url = url;
//         this.token = token;
//         this.from = `vPorti <${process.env.EMAIL_FROM}>`;
//     }

//     newTransport() {
//         if (process.env.NODE_ENV === 'production') {

//             return nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL_USERNAME,
//                     pass: process.env.EMAIL_PASSWORD
//                 }
//             });
//         }

//         return nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });
//     }


//     async send(template, subject) {

//         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//             firstName: this.firstName,
//             url: this.url,
//             token: this.token,
//             subject
//         });

//         const mailOptions = {
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text: htmlToText.fromString(html)
//         };

//         await this.newTransport().sendMail(mailOptions);
//     }

//     async sendWelcome() {
//         await this.send('welcome', 'Welcome to Lakhey Family!');
//     }

//     async sendPasswordReset() {
//         let date = new Date();
//         let exdate = date.getTime() + 600000;
//         exdate = new Date(exdate)
//         date = date.toLocaleTimeString();
//         let newdate = exdate.toLocaleTimeString();
//         await this.send(
//             'passwordReset',
//             `Your password reset token only valids for 10 min from ${date} to ${newdate}`
//         );
//     }
// }