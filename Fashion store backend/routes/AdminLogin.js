const express= require ("express")
const router = express.Router();
const {Adminregistration,Adminlogin,AdminPassword} = require("../controller/AdminLogin.js");









// router.get('/getlogindetail',getAllLoginDetails)
router.post('/adminregister',Adminregistration)
router.post('/adminlogin',Adminlogin)
// // router.delete('/deleteSub/:id',deleteSub)
router.put('/adminchanging',AdminPassword)



module.exports = router;