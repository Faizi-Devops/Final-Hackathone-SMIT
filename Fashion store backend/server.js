const express = require("express");
const dotenv = require("dotenv")
const multer = require("multer")

const cors = require("cors");
const connectiondb = require("./config/connectdb");
const userRegisterroute = require("./routes/Userregister")
const addStating = require("./routes/AddState")
const addCatogy = require("./routes/AddCategory")
const subSubcategory = require("./routes/AddSub")
const logindetail = require('./routes/Logindetail')
const changePassword = require('./routes/Password')
const complain = require('./routes/Complain')
const nopro = require('./routes/NoProcess')
const proc = require('./routes/Process')
const close = require('./routes/Close')
const admin = require('./routes/AdminLogin')
const change = require('./routes/Forgetpassword')
const cart = require('./routes/Cart')


dotenv.config()

const app= express();
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json())
app.use('/api',userRegisterroute)
app.use('/new',addStating)
app.use('/cat',addCatogy)
app.use('/sub',subSubcategory)
app.use('/log',logindetail)
app.use('/sub',changePassword)
app.use('/comp',complain)
app.use('/nop',nopro)
app.use('/proc',proc)
app.use('/close',close)
app.use('/admi',admin)
app.use('/change',change)
app.use('/cart',cart)

app.use('/uploads',express.static('uploads'))
app.use('/complaints', express.static('complaints'));
app.use('/noprocess', express.static('noprocess'));


connectiondb(process.env.DATABASE_URL)


app.listen(port,()=>{
    console.log(`The app is listening on the ${port} port`)
})





