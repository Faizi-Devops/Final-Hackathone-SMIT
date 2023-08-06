const express= require ("express")
const router = express.Router();
const multer  = require('multer')
const {Userregistration,Userlogin,changePassowrd,userLogged,sendEmailForgetPassword,getAllUsers,deleteUser,LoggedinuserData,updateUserWithEmail} = require("../controller/Userregister.js");
const { checkuserAuth } = require("../middleware/authMiddleware.JS");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    },
  });
  const uploads = multer({ storage: storage });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/public/images')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.originalname + '-' + uniqueSuffix)
//     }
//   })

//   const upload = multer({ dest: storage })

router.use('/changePassword',checkuserAuth)
router.use('/getloggeduser',checkuserAuth)





router.post('/userRegister',Userregistration)
router.post('/userLogin',Userlogin)
router.post('/forgetPassword',sendEmailForgetPassword)
router.get('/getUsers',getAllUsers)
router.delete('/deleteUser/:id',deleteUser)
router.get('/userData',LoggedinuserData)
router.put('/updateData',uploads.single('image'),updateUserWithEmail)
// router.post('/userUpdate',updateUserDataLogin)




//protected routes
router.post('/changePassword',changePassowrd)
router.get('/getloggeduser',userLogged)
module.exports = router;