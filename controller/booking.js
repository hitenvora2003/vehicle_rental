const user = require('../model/booking')



exports.pageviews = async (req, res) => {
  try {
    const alldata = await user.find().populate('user').populate({path : 'vehicle' , populate : {path : 'location'}}).populate({path : 'payment',populate : [{path : 'booking'},{path : 'user'}]})
    console.log(alldata)
    res.status(200).json({
      status: 'success',
      message: 'data find successfull',
      data: alldata
    })

  }
  catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,

    })
  }
}



exports.createdata = async (req, res) => {
  try {
    let passdata = req.body

    // 🔒 Step 1: Check already booked or not
    const alreadyBooked = await user.findOne({
      vehicle: passdata.vehicle,
      Date: passdata.Date,
    })

    if (alreadyBooked) {
      throw new Error("this slot already reserved")
    }

    // ✅ Step 2: Create booking
    const data = await user.create(passdata)

    res.status(200).json({
      status: "success",
      message: "booking successful",
      data
    })

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}
exports.deleteData = async (req, res) => {
  try {
    const deleteid = req.params.deleteid
    const deleteData = await user.findByIdAndDelete(deleteid)
    res.status(200).json({
      status: 'success',
      message: 'data delete is success',
      data: deleteData

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}
exports.updatedata = async (req, res) => {
  try {

    const Id = req.params.editdata

    const editdata = await user.findByIdAndUpdate(Id, req.body, { new: true })
    res.status(200).json({
      status: 'success',
      message: 'data update is success',
      data: editdata

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error
    })
  }
}


