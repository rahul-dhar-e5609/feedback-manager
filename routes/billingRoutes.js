const keys = require ('../config/keys');
const stripe = require ('stripe')(
  keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin');
const Transaction = require('../utils/Transaction').FMTransaction;

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    console.log("Request Body: ", req.body);
    const amount = 100;
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "$1 for 10 credits"
    });
    req.user.credits += 10;
    const transaction = await Transaction.add( amount, req.user.id, req.body.email, req.user.credits);
    console.log("Transaction [billing routes]", transaction);
    const user = await req.user.save();
    res.send(user);
  });

  app.get('/api/transactions', requireLogin, async (req, res) => {
    try {
      const transactions = await Transaction.getByUserID(req.user.id);
      res.send(transactions.reverse());
    } catch (err) {
      res.status(HTTPCODES.UNPROCESSABLE_ENTITY).send(err);
    }
  });
};
