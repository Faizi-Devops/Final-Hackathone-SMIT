const express= require ("express")
const router = express.Router();
const {one,getProcess,deleteCprocess} = require("../controller/Process");






// router.get('/getAllComplaints',allComplains)
router.get('/getprocess',getProcess)
router.post('/createProcess',one)
router.delete('/deleteCprocess/:id',deleteCprocess)
// router.delete('/deleteSub/:id',deleteSub)
// router.put('/updateSub/:id',updateSub)
// router.put('/counting',counting)



module.exports = router;