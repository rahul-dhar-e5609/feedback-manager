import mongoose = require('mongoose');
import FMEnum from './FMEnum';
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

type Recipients = {
    email: string
}
/**
 * This class is responsible for
 * handling the information regarding the 
 * surveys
 * 
 * Version 1.0.0
 * author: Rahul Dhar
 */
export class FMSurvey {
    /**
     * This function is responsible for fetching
     * all the surveys of a particular user
     * 
     * Version 1.0.0
     * @param userID | User ID of the owner
     */
    static async getByUserID(userID: string): Promise<any> {
        //bail if user ID is not valid
        if (userID.trim() == FMEnum.EMPTY_STRING || typeof userID != 'string') {
            //rejecting with an Error object
            const reject = new Promise((resolve, reject) => {
                reject(new Error('Invalid User ID format!'));
            });
            return reject;
        }
        return await Survey.find({ _user: userID })
            .select({ 
                recipients: false,
                body: false,
                yes: false,
                no: false,
                _user: false,
                lastResponded: false,
                __v: false,
                _id: false
            }); // not including the recipients sub-document
    }

    static async createSurvey(title: string, subject: string, body: string, recipients: string, userID: string, draft: boolean = false): Promise<any> {
        const survey = new Survey({                                               
            title,
            subject,
            body,
            recipients: FMSurvey.parseRecipientStringToArray(recipients),
            _user: userID,
            dateSent: Date.now()
        });
        if(!draft){
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();    
        }
        return await survey.save();
    }

    static parseRecipientStringToArray(recipients: string): Recipients[] {
        const receps = recipients.split(',').map(email => ({ email: email.trim() }));
        console.log('Recepients array: ', receps);
        return receps;
    }
}
