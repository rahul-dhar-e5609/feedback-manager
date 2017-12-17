const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(keys.mongoURI);

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//only in production
if(process.env.NODE_ENV === 'production'){
  //express handles everything correctly in production
  //express will server up prod assets
  //like out main.js pr main.css file
  //if any get req comes in for some route, and we dont understand what is looking for,
  //look in /client/build and see if it matches
  app.use(express.static('client/build'));
  //Express will serve index.html if doesnot recognize the route`
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 6003;
app.listen(PORT);
