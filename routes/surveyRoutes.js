const _ = require('lodash');
const Path = require('path-parser');
const { URL } =require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');
const SurveyConfig = require('../utils/Survey').FMSurvey;
const HTTPCODES = require('../utils/Survey').HTTPCODES;

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    try{
      const surveys = await SurveyConfig.getByUserID(req.user.id);
      res.send(surveys);  
    } catch(err){
      res.status(HTTPCODES.UNPROCESSABLE_ENTITY).send(err);
    }
  });

  app.get('/api/surveys/:surveyID/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    /**
     * Mapping through the events and removing all those events
     * that dont have a surveyID or a choice in the pathname
     */
    const p = new Path('/api/surveys/:surveyID/:choice');
    _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL (url).pathname);
        if(match){
          return { 
            email,
            surveyID: match.surveyID,
            choice: match.choice
          };
        }
      })
      .compact()    //takes an array, removes undefined elements    
      .uniqBy('email', 'surveyID')      //fetch unique events based on email and surveyIDs
      .each( ({ surveyID, email, choice }) => {
        Survey.updateOne({
            _id: surveyID,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },{
            $inc: { 
              [choice]: 1
            },
            $set: { 
              'recipients.$.responded': true
            },
            lastResponded: new Date()
          }).exec();
      })
      .value();
    res.send({});
  });
  app.post('/api/surveys', requireLogin, requireCredits,  async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try{
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    }catch(err){
      //unprocessable entity
      res.status(HTTPCODES.UNPROCESSABLE_ENTITY).send(err);
    }
  });
};
