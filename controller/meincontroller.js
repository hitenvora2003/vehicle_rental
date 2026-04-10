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

        const type = req.query.type?.toLowerCase();

        if (!type) {
            const [users, locations, vehicles, bookings, payments, maintenances, coupons, feedbacks, totalusers, totallocations, totalvehicles, totalbookings, totalpayments, totalmaintenances, totalcoupons, totalfeedbacks] = await Promise.all([
                user.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                location.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                vehicle.find().populate('location').sort({ crearedAt: -1 }).skip(skip).limit(limit),
                booking.find().populate('user').populate({
                    path: 'vehicle', populate: { path: 'location' }
                }).populate({
                    path: 'payment', populate: [{ path: 'booking' }, { path: 'user' }]
                }).sort({ crearedAt: -1 }).skip(skip).limit(limit),
                payment.find().populate({
                    path: 'booking', populate: [{ path: 'user' }, {
                        path: 'vehicle', populate: {
                            path: 'location'
                        }
                    }, { path: 'payment' }]
                }).populate('user').sort({ crearedAt: -1 }).skip(skip).limit(limit),
                maintenance.find().populate({
                    path: 'vehicle', populate: { path: 'location' }
                }).sort({ crearedAt: -1 }).skip(skip).limit(limit),
                coupon.find().sort({ crearedAt: -1 }).skip(skip).limit(limit),
                feedback.find().populate('user').populate({ path: 'vehicle', populate: { path: 'location' } }).sort({ crearedAt: -1 }).skip(skip).limit(limit),

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

        //perticuler mode//
        if (type === 'user') {
            const users = await user.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalusers = await user.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalusers,
                data: users
            })
        }
        if (type === 'location') {
            const locations = await location.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totallocations = await location.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totallocations,
                data: locations
            })
        }
        if (type === 'vehicle') {
            const vehicles = await vehicle.find().populate('location').sort({ crearedAt: -1 }).skip(skip).limit(limit)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalvehicles = await vehicle.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalvehicles,
                data: vehicles
            })
        }
        if (type === 'booking') {
            const bookings = await booking.find().populate('user').populate({
                path: 'vehicle', populate: { path: 'location' }
            }).populate({
                path: 'payment', populate: [{ path: 'booking' }, { path: 'user' }]
            }).sort({ crearedAt: -1 }).skip(skip).limit(limit)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalbookings = await booking.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalbookings,
                data: bookings
            })
        }
        if (type === 'payment') {
            const payments = await payment.find().populate({
                path: 'booking', populate: [{ path: 'user' }, {
                    path: 'vehicle', populate: {
                        path: 'location'
                    }
                }, { path: 'payment' }]
            }).populate('user').sort({ crearedAt: -1 }).skip(skip).limit(limit)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalpayments = await payment.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalpayments,
                data: payments
            })
        }
        if (type === 'maintenance') {
            const maintenances = await maintenance.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalmaintenances = await maintenance.find().populate({
                path: 'vehicle', populate: { path: 'location' }
            }).sort({ crearedAt: -1 }).skip(skip).limit(limit)
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalmaintenances,
                data: maintenances
            })
        }
        if (type === 'coupon') {
            const coupons = await coupon.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalcoupons = await coupon.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalcoupons,
                data: coupons
            })
        }
        if (type === 'feedback') {
            const feedbacks = await feedback.find().populate('user').populate({ path: 'vehicle', populate: { path: 'location' } }).sort({ crearedAt: -1 }).skip(skip).limit(limit)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalfeedbacks = await feedback.countDocuments()
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalfeedbacks,
                data: feedbacks
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}


