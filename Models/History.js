const mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users'
 },
 name:{
   type: String,
   require: true,
   trim: true
 },
 amount:{
    type: Number,
    require: true
 },
 generate:{
    type: Date,
    require: true
 },
 due:{
    type: Date,
    require: true
 },
 date:{
    type: Date,
    default: Date.now
 },
});

module.exports = mongoose.model('history',HistorySchema);