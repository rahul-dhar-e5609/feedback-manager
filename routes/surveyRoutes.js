const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
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
    try {
      const surveys = await SurveyConfig.getByUserID(req.user.id);
      res.send(surveys.reverse());
    } catch (err) {
      res.status(HTTPCODES.UNPROCESSABLE_ENTITY).send(err);
    }
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, footer } = req.body;
    const entries = Object.entries(req.body)
    let _q = [];
    console.log("Keys", entries);
    entries
      .map(entry => {
        // const qReg = /^question-%d/
        const qReg = /^(question)-(\d*)/;
        const opReg = /^(q)(\d*)_(op)-(\d*)/;
        const key = entry[0];
        const value = entry[1];
        if (qReg.test(key)) {
          const k = key.match(/(\d*)$/gm).filter(key => key.trim());
          _q[k[0]] = {'q':value};
        }else if(opReg.test(key)){
          const k = key.match(/(\d)*/gm).filter(key => key.trim());
          let q = _q[k[0]];
          q.op = q.op || {};
          q.op[k[1]] = value;
          _q[k[0]] = q;
        }
      });
    console.log("Questions Array: ", _q);
    try {
      /**
       * TODO:
       * Survey record should also save the amount
       * of credits that were utilised in sending the 
       * survey.
       */
      const surveys = await SurveyConfig.createSurvey(title, subject, body, recipients, req.user.id);
      req.user.credits -= 1 * SurveyConfig.parseRecipientStringToArray(recipients).length;
      console.log("Deducted to: ", req.user.credits);
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
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
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyID: match.surveyID,
            choice: match.choice
          };
        }
      })
      .compact()    //takes an array, removes undefined elements    
      .uniqBy('email', 'surveyID')      //fetch unique events based on email and surveyIDs
      .each(({ surveyID, email, choice }) => {
        Survey.updateOne({
          _id: surveyID,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false
            }
          }
        }, {
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
};
