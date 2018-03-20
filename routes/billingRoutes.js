const keys = require ('../config/keys');
const stripe = require ('stripe')(
  keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 100,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "$1 for 10 credits"
    });
    //console.log(charge);
    req.user.credits += 10;
    const user = await req.user.save();
    res.send(user);
  });
};
