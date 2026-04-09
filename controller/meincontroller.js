const user = require('../model/user')
const location = require('../model/location')
const vehicle = require('../model/vehicle')
const booking = require('../model/booking')
const payment = require('../model/payment')
const maintenance = require('../model/maintenances')
const coupon = require('../model/coupon')
const feedback = require('../model/feedback')

exports.getalldata = async (req, res) => {
    try {
        const page = (req.query.page) || 1;
        const limit = (req.query.limit) || 10;
        const skip = (page - 1) * limit

        const types = req.query.type

        if (!types) {
            const [users, locations, vehicles, bookings, payments, maintenances, coupons, feedbacks,totalusers, totallocations, totalvehicles, totalbookings, totalpayments, totalmaintenances, totalcoupons, totalfeedbacks] = await Promise.all([
                user.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                location.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                vehicle.find().populate('location').sort({ crearedAt: -1 }).skip(skip).limit(limit),
                booking.find().populate('user').populate({
                    path : 'vehicle' , populate : {path : 'location'}}).populate({
                        path : 'payment',populate : [{path : 'booking'},{path : 'user'}]}).sort({ crearedAt: -1 }).skip(skip).limit(limit),
                payment.find().populate({
                    path : 'booking', populate : [{path : 'user'},{path : 'vehicle',populate :{
                        path :'location'}},{path : 'payment'}]}).populate('user').sort({ crearedAt: -1 }).skip(skip).limit(limit),
                maintenance.find().populate({
                    path : 'vehicle', populate : {path :'location'}}).sort({ crearedAt: -1 }).skip(skip).limit(limit),
                coupon.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                feedback.find().populate('user').populate({path: 'vehicle',populate :{path : 'location'}}).sort({ crearedAt: -1 }).skip(skip).limit(limit),

                user.countDocuments(),
                location.countDocuments(),
                vehicle.countDocuments(),
                booking.countDocuments(),
                payment.countDocuments(),
                maintenance.countDocuments(),
                coupon.countDocuments(),
                feedback.countDocuments(),
     
            ])
            return res.status(200).json({
                status: 'success',
                message: 'pagination successfull',
                page, limit,
                totalusers, totallocations, totalvehicles, totalbookings, totalpayments, totalmaintenances, totalcoupons, totalfeedbacks,
         
                data: { users, locations, vehicles, bookings, payments, maintenances, coupons, feedbacks }
            })

        }

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}


