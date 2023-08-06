const express= require ("express")
const router = express.Router();
const {forgetPaasword} = require("../controller/Forgetpassword");










// router.get('/getSub',getAllSub)
router.post('/forgetPassword',forgetPaasword)







module.exports = router;