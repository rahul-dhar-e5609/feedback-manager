const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(keys.mongoURI);

//tells express that it needs to make use of cookies
app.use(
  //cookiesession takes the data out of the cookie and assigns to req.session
  //one of the props in session is called passport and passport has a key user which has our user's ID
  cookieSession({
    maxAge:30*24*60*60*1000,
    //key to encrypt our cookie
    keys: [keys.cookieKey]
  })
);

//app.use calls are wiring up middlewares
//they are small func modifying incoming reqs before they go to route handlers
//middlewares are great place for the logic that are to most of the route handlers
//tell passport that it should use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require ('./routes/authRoutes')(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT);
