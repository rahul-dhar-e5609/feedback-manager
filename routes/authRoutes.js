const passport = require('passport');

/**
 *
 *  routeHandler for google
 *
 *  GoogleStrategy internally has code that says
 *  i am known as a stratergy known google, so when
 * you say pasport use a stratergy
 * by name of google, GoogleStrategy is called
 *
 * Scope is an options object and it specifies to the Google Servers what access we want tot have
 * inside of this user's profile
 *
 * We ask google to help us with the user's profile nad his email
 * Similarly we can ask for user's photos on google or contacts
 */

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res)=>{
    //.logout function added by passport to the req
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res)=>{
    //when we say that cookie session library extracts the data, it does
    //it extracts the data out of the cookie and assigns to req.session
    //req.session has the data that passport is trying to save inside the cookie
    //res.send(req.session);

    //passport attaches the user property to the req object
    res.send(req.user);
  });
};
