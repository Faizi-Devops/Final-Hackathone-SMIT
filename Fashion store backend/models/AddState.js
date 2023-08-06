const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String,required:true},
    dating: { type: String},
    updated:{type:String}
    

});



const State = mongoose.model('State', stateSchema);

module.exports = State;
