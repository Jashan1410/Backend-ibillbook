const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
      branch:{
         type: String,
         require: true,
         trim: true
      },
      name:{
         type: String,
         require: true,
         trim: true
      },
      phone:{
         type: Number,
         require: true,
         trim: true
      },
      load:{
         type: Number,
         require: true,
         trim: true
      },
      age:{
         type: Number,
         require: true,
         trim: true
      },
      email:{
         type: String,
         require: true,
         unique: true
      },
      password:{
         type: String,
         require: true
      },
      type:{
         type: String,
         require: true
      },
      date:{
         type: Date,
         default: Date.now
      },  
});

const User = mongoose.model('users',UserSchema);
module.exports = User;