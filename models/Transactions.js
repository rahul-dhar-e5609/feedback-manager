const mongoose = require('mongoose');
const { Schema } = mongoose;
//mongoose object has aproperty named Schema
//take that property and assign it to variable Schema


const TransactionSchema = new Schema({
    creditedOn: Date,
    email: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, default: 0 },
    credits: { type: Number, default: 0 }
});


//two params = trying to set something in mongoose
mongoose.model('transactions', TransactionSchema);
