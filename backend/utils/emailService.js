const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendNewsEmail = async (toEmail, userName, articles, category) => {
    try {
        const articlesList = articles.map(a =>
            `<li style="margin-bottom:12px">
                <a href="${a.url}" style="font-weight:bold;color:#7c3aed">${a.title}</a>
                <p style="margin:4px 0;color:#555">${a.description || ''}</p>
             </li>`
        ).join('');

        await transporter.sendMail({
            from: `"CB's News Alert" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `📰 News Alert: ${category.toUpperCase()} Updates`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                    <h2 style="color:#7c3aed">Hello ${userName}! 👋</h2>
                    <p>Here are your latest <strong>${category}</strong> news updates:</p>
                    <ul style="padding-left:16px">${articlesList}</ul>
                    <hr/>
                    <p style="color:#999;font-size:12px">CB's News Alert App</p>
                </div>
            `
        });
        console.log(`✅ Email sent to ${toEmail}`);
    } catch (error) {
        console.log('❌ Email error:', error.message);
    }
};

module.exports = { sendNewsEmail };