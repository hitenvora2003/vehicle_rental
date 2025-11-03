
var express = require('express');
var router = express.Router();
const uc = require('../controller/vehicle')
const am = require('../middelware/auth')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({ storage: storage })


router.get('/',am.authCheck, uc.pageviews);
router.post('/createdata',am.authCheck,upload.single('image'),uc.createdata)
router.delete('/:deleteid',am.authCheck,uc.deleteData)
router.patch('/:editdata',am.authCheck,upload.single('image'),uc.updatedata)




module.exports = router;