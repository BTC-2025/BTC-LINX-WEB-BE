const Schedule = require('../models/Schedule')
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const createSchedule = async(req,res) =>{
    try{
        const { name,email,companyname,phonenum,message} = req.body;
        console.log(name,email,companyname,phonenum,message)

        if(!name || !email || !companyname || !phonenum || !message){
            return res.status(400).json({error:"Some data is missing"})
        }

        const contact = await Schedule.create({
            name,
            email,
            companyname,
            phonenum,
            message
        })

        const htmlContent = `
            <!doctype html>
            <html>
            <body style="margin:0;padding:20px;font-family:Arial,Helvetica,sans-serif;background-color:#f8fafc;color:#111;">
                <h1 style="color:#1d4ed8;font-size:28px;">BTC-LINX Consultation Request</h1>

                <p style="font-size:16px;line-height:1.6;color:#374151;">
                Hello Balaji,<br><br>
                You have a <span style="color:#16a34a;font-weight:bold;">LINX Consultation request</span>.
                </p>

                <p style="font-size:15px;color:#111827;">
                <strong>Name:</strong> <span style="color:#dc2626;">${escapeHtml(name)}</span><br>
                <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a><br>
                <strong>Company Name:</strong> ${escapeHtml(companyname)}<br>
                <strong>Phone :</strong> ${escapeHtml(phonenum)}<br>
                <strong>Message:</strong> ${escapeHtml(message)}<br>
                </p>

                <hr style="margin:30px 0;border:0;border-top:2px dashed #e5e7eb;">

                <p style="font-size:12px;color:#9ca3af;text-align:center;">
                — Sent from <span style="color:#2563eb;">BTC - LINX</span> —
                </p>
            </body>
            </html>
        `;

        const textContent = `Somebody Contacted
            Name:${name},
            Email:${email},
            Company_Name:${companyname},
            Phone: ${phonenum}
            Message:${message}
        `;

        const emailOptions = {
            from: "BTC - LINX <noreply@btcglobal.info>", // works without domain verification
            to: process.env.ADMIN_EMAIL,
            reply_to: email,
            subject: `LINX Consultation Request by - ${companyname}`,
            html: htmlContent,
            text: textContent,
        };

        const dat = await resend.emails.send(emailOptions);

        return res.status(200).json({message:"Contact mail sended successfully",data:contact,mail:dat})
    }catch(err){
        console.error(err)
    }
    
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


module.exports = {createSchedule}