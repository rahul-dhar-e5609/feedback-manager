const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient');
const QuestionSchema = require('./Questions');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // array of recipientSchema records
  questions: [QuestionSchema],  // array of questionSchema records
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User'}, //reference to instance of User
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
