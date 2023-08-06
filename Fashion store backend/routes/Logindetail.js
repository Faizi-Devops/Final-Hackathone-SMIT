const express= require ("express")
const router = express.Router();
const {createLogindetail,getAllLoginDetails,updateStateByEmail} = require("../controller/Logindetail.js");









router.get('/getlogindetail',getAllLoginDetails)
router.post('/logindetail',createLogindetail)
// router.delete('/deleteSub/:id',deleteSub)
router.put('/updatelogindetails',updateStateByEmail)



module.exports = router;