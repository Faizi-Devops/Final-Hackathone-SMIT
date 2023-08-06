const express= require ("express")
const router = express.Router();
const {getAllStates, createState,deleteState,updateState} = require("../controller/AddState.js");









router.get('/getStates',getAllStates)
router.post('/addState',createState)
router.delete('/deleteState/:id',deleteState)
router.put('/updateState/:id',updateState)



module.exports = router;