const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//ES15 Magic
//can be written as
const { Schema } = mongoose;
//mongoose object has aproperty named Schema
//take that property and assign it to variable Schema


const UserSchema = new Schema({
  googleID: String
});


//two params = trying to set something in mongoose
mongoose.model('users', UserSchema);
