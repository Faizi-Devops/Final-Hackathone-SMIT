const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    email: { type: String },
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
    name:{type:String,required:true},
    description:{type:String},
    price:{type:Number},
    color:{type:String},
    ratings:[{
        userId:String,
        rating:Number,
        review:String,
    }],
    stock:{type:String},
    createdAt:{
        type:String,
    }
    ,updatedAt:{
        type:String
    },
    size:{
        type:String
    },



    notprocess:{type:Number,default: 0},
    process:{type:Number},
    closed:{type:Number},
    updated:{type:String}
    

});



const State = mongoose.model('Complain', complainSchema);

module.exports = State;
