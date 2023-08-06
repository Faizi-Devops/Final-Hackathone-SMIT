const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String,required:true},
    dating: { type: String},
    updated:{type:String},
    category:{type:String}
    

});



const State = mongoose.model('Subcategory', stateSchema);

module.exports = State;
