import paypal from 'paypal-rest-sdk'
import Booking from './../models/Booking.js'

let total= 0
let newBooking = new Booking()

export const pay = (req, res) => {
    try {
        total = req.body.totalAmount
        newBooking= Booking(req.body.booking)
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "https://webdulich.onrender.com/api/v1/pay/success",
                "cancel_url": "https://webdulich.onrender.com/api/v1/pay/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": req.body.booking.tourName,
                        "sku": "001",
                        "price": req.body.totalAmount,
                        "currency": "USD",
                        "quantity": "1"
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": req.body.totalAmount
                },
                "description": "Booking tour"
            }]
        };
    
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log(payment)
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    // res.redirect(payment.links[i].href);
                    res.json({forwardLink: payment.links[i].href});
                  }
                }
            }
          });
    
    } catch (error) {
        console.log(error.message);
    }
}

export const paySuccess = (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // console.log(JSON.stringify(payment));
            // res.send('Success (Mua hàng thành công)');
            // try {   
                const savedBooking = await newBooking.save()
          
            //     res.status(200).json({success:true, message:"Your tour is booked!", data:savedBooking})
                
            //  } catch (error) {
            //     res.status(500).json({success:false, message:"Internal server error!"})
            //  }
            return res.redirect("https://webdulich-fe.onrender.com/thank-you");

        }
    });
}

export const payCancel = (req,res) => {
    return res.redirect("http://localhost:3000")
}