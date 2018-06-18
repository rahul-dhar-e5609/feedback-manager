const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new Schema ({
    option: String,
    count: { type: Number, default: 0 }
});
//exporting schema instead of loading it using mongoose
// this schema is a sub document collection to the questions document
module.exports = optionSchema;
