const express= require ("express")
const router = express.Router();
const {createComplain,complaintswithEmail,updatedProduct,counting,allComplains,deleteProduct,countingProcess,updatewithnumber,countingClose} = require("../controller/Complain");
const multer  = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'complaints/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    },
  });
  const uploads = multer({ storage: storage });





// router.get('/getSub',getAllSub)
router.get('/complainemail',complaintswithEmail)
router.get('/complaintsgetting',allComplains)
router.post('/createComplain',uploads.single('file'),createComplain)
router.post('/countingprocess',countingProcess)
router.post('/countingClose',countingClose)
router.post('/updatewithnumber',updatewithnumber)
router.delete('/deleteProduct/:id',deleteProduct)
router.put('/UpdateProduct/:id',updatedProduct)

// router.post('/updatewithnumber',updatewithnumber)
// router.delete('/deleteSub/:id',deleteSub)
// router.put('/updateSub/:id',updateSub)
router.put('/counting',counting)



module.exports = router;