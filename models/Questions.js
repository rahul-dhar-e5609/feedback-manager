const mongoose = require('mongoose');
const { Schema } = mongoose;
const OptionSchema = require('./Options');

const questionSchema = new Schema ({
    question: String,
    options: {type: [OptionSchema], default: []}, // array of recipientSchema records
});
//exporting schema instead of loading it using mongoose
// this schema is a sub document collection to the survey document
module.exports = questionSchema;
