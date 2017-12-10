const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
  email: String,
  responded: { type: Boolean, default: false}
});
//exporting schema instead of loading it using mongoose
// this schema is a sub document collection to the survey document
module.exports = recipientSchema;
