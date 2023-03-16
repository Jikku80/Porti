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
            name: "vporti"
        };
    }

    async sendMail() {

        const mailtoken = process.env.MAIL_TRAP

        const client = new MailtrapClient({ token: mailtoken })
        client.send({
            from: this.from,
            to: this.to,
            template_uuid: "6e93fabf-232d-4438-8943-b17c100e65c3",
            template_variables: {
                "user_name": this.firstName,
                "next_step_link": "www.vporti.com",
                "get_started_link": "www.vporti.com/#pGuide",
                "onboarding_video_link": "www.vporti.com/#pHelper"
            }
        })
            .then(console.log, console.error);
    }

    async sendResetMail() {
        const resetmailtoken = process.env.MAIL_TRAP
        const resetlink = `${this.url}?${this.token}`
        const emailad = this.to[0].email;
        const client = new MailtrapClient({ token: resetmailtoken })
        client.send({
            from: this.from,
            to: this.to,
            template_uuid: "ad94b3a8-fd10-441c-abbf-e8a327f75344",
            template_variables: {
                "user_email": emailad,
                "pass_reset_link": resetlink
            }
        })
            .then(console.log, console.error);
    }

    async sendWelcome() {
        await this.sendMail();
    }

    async sendPasswordReset() {
        await this.sendResetMail();
    }
}