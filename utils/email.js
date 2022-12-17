const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url, token) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.token = token;
        this.from = `Porti <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {

            return nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }


    async send(template, subject) {

        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            token: this.token,
            subject
        });

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to Lakhey Family!');
    }

    async sendPasswordReset() {
        let date = new Date();
        let exdate = date.getTime() + 600000;
        exdate = new Date(exdate)
        date = date.toLocaleTimeString();
        let newdate = exdate.toLocaleTimeString();
        await this.send(
            'passwordReset',
            `Your password reset token only valids for 10 min from ${date} to ${newdate}`
        );
    }
}
