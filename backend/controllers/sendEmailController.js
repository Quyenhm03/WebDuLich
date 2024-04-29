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
            subject: "Thông tin về việc đặt Tour của bạn tại TravelWord", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <h3>Xin chào ${req.body.booking.fullName},</h3>
            <p>Bạn nhận được email này bởi vì bạn đã đặt tour tại TravelWord.</p>
            <p>Thông tin về tour của bạn:</p>
            <div><b>Tên Tour: ${req.body.booking.tourName}</b></div>
            <div><b>Sô lượng khách: ${req.body.booking.guestSize}</b></div>
            <div><b>Số điện thoại: ${req.body.booking.phone}</b></div>
            <div><b>Đặt vào: ${req.body.booking.bookAt}</b></div>
            <div><b>Phí dịch vụ: ${req.body.serviceFee}$</b></div>
            <div><b>Tổng tiền: ${req.body.totalAmount}$</b></div>
            <p>Quý khách vui lòng kiểm tra thông tin và phản hồi cho chúng tôi sớm nhất để hoàn thành việc đặt tour.</p>
            <div>Cảm ơn bạn đã chọn TravelWorld!</div>
            `, // html body
        })

        res.status(200).json({success:true, message:"Email sent succesfully!"})
    } catch (err) {
        
        res.status(500).json({success:false, message:"Email not sent!"})
    }
}