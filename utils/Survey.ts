import mongoose = require('mongoose');
import FMEnum from './FMEnum';
const Survey = mongoose.model('surveys');

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
            .select({ recipients: false }); // not including the recipients sub-document
    }
}
