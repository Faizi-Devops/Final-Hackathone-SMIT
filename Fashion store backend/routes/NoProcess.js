const express= require ("express")
const router = express.Router();
const {one,allComplains,deleteComplain} = require("../controller/NoProcess");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'noprocess/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    },
  });
  const uploads = multer({ storage: storage });






router.get('/getAllComplaints',allComplains)
// router.get('/complainemail',complaintswithEmail)
router.post('/createNoprocess',uploads.single('file'),one)
router.delete('/deleteComplain/:id',deleteComplain)
// router.put('/updateSub/:id',updateSub)
// router.put('/counting',counting)



module.exports = router;