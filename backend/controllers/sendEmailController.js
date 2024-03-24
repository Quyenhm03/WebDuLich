import nodemailer from 'nodemailer'

export const sendEmail = async(req, res) => {

    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.EMAIL_APP, // sender address
            to: req.body.booking.userEmail, // list of receivers
            subject: "Information about your booking tour at TravelWord", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <h3>Hello ${req.body.booking.fullName},</h3>
            <p>You received email because you booked tour at TravelWord.</p>
            <p>Information about your booking:</p>
            <div><b>Tour name: ${req.body.booking.tourName}</b></div>
            <div><b>Guest size: ${req.body.booking.guestSize}</b></div>
            <div><b>Phone: ${req.body.booking.phone}</b></div>
            <div><b>Book at: ${req.body.booking.bookAt}</b></div>
            <div><b>Service fee: ${req.body.serviceFee}$</b></div>
            <div><b>Total amount: ${req.body.totalAmount}$</b></div>
            <p>Please check you information and respond to us soon to complete the tour booking.</p>
            <div>Thank your for your booking!</div>
            `, // html body
        })

        res.status(200).json({success:true, message:"Email sent succesfully!"})
    } catch (err) {
        
        res.status(500).json({success:false, message:"Email not sent!"})
    }
}