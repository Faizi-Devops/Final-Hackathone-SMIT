const mongoose = require('mongoose');

const logindetailSchema = new mongoose.Schema({
    email: { type: String, trim: true },
    logintime: { type: String, trim: true },
    logouttime: { type: String, trim: true },
    status: { type: String, trim: true },
    uniqueId: { type: String, trim: true },
    uniqueness:{type:String,trim:true}


});



const Logindetail = mongoose.model('Logindetail', logindetailSchema);

module.exports = Logindetail;
