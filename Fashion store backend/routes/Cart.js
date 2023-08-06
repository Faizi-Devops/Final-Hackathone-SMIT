const express= require ("express")
const router = express.Router();
const {createCart} = require("../controller/Cart");






// router.get('/getAllCLose',getClose)
// router.get('/complainemail',complaintswithEmail)
router.post('/createCart',createCart)
// router.delete('/deleteSub/:id',deleteSub)
// router.put('/updateSub/:id',updateSub)
// router.put('/counting',counting)



module.exports = router;