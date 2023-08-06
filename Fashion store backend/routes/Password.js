const express= require ("express")
const router = express.Router();
const {Changing} = require("../controller/Password.js");









router.put('/Changing',Changing)




module.exports = router;