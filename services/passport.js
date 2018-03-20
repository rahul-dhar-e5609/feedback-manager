const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//one param = trying to get something out of mongoose
//fetching the model class which corresponds to the users db
const User = mongoose.model('users');

//first param user model
//second param done callback func
passport.serializeUser((user, done)=>{
  done(null, user.id);  // user.id => _id property of mongo record (model instance)
})

//first param is the token that is stuffed into the cookie
//done function
passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use( new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy:true//trust the proxy
},
  //this is the new es17 syntax for handling asuny
  //code, with functions that handles promises
  async (accessToken, refreshToken, profile, done) => {
    console.log("Profile", profile);
    //getting user details here
    //creates new model instance of user
    //these are all asynchronous actions
    //returns a promise
    const existingUser = await User.findOne({googleID:profile.id});
    //existingUser is a model instance that was found
    if(existingUser){
      //we already have a record with the given profile ID
      //first parameter shows an error object
      return done(null, existingUser);
    }
    //make a new record
    const user = await new User({
      googleID: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value.split("?")[0] 
    }).save();
    //user is another model instance
    //both represent the same model
    //this user is provided to us by the mongoose
    //showing thhat user has been created
    return done(null, user);
  }) );
