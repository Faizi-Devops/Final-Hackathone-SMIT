const express= require ("express")
const router = express.Router();
const {addClose,getClose} = require("../controller/Close");






router.get('/getAllCLose',getClose)
// router.get('/complainemail',complaintswithEmail)
router.post('/createClose',addClose)
// router.delete('/deleteSub/:id',deleteSub)
// router.put('/updateSub/:id',updateSub)
// router.put('/counting',counting)



module.exports = router;