const sgMail = require('@sendgrid/mail');

const sendEmail = async options => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    sgMail.send(msg);

}

module.exports = sendEmail;