const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
    email: { type: String, required: true },
    complainumber:{type:Number},
    category:{type:String,trim:true},
    complainttype:{type:String,trim:true},
    nature:{type:String,trim:true},
    details:{type:String,trim:true},
    finalstatus:{type:String,trim:true},
    regdate:{type:String},
    subcategory:{type:String,trim:true},
    state:{type:String,trim:true},
    file:{type:String},
    fullName:{type:String},

    notprocess:{type:Number,default: 0},
    process:{type:Number},
    closed:{type:Number},
    updated:{type:String}
    

});



const State = mongoose.model('Process', processSchema);

module.exports = State;
