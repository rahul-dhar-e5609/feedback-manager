import mongoose = require('mongoose');
const Transaction = mongoose.model('transactions');
import FMEnum from './FMEnum';

export class FMTransaction {
    static async add(amount: number, userID: string,  email: string, credits: number): Promise<any> {
        if (userID.trim() == FMEnum.EMPTY_STRING || typeof userID != 'string') {
            //rejecting with an Error object
            const reject = new Promise((resolve, reject) => {
                reject(new Error('Invalid User ID format!'));
            });
            return reject;
        }
        const transaction = new Transaction({
            amount,
            credits,
            email,
            _user: userID,
            creditedOn: Date.now()
        });
        return await transaction.save()
    }

    static async getByUserID(userID: string): Promise<any> {
        //bail if user ID is not valid
        if (userID.trim() == FMEnum.EMPTY_STRING || typeof userID != 'string') {
            //rejecting with an Error object
            const reject = new Promise((resolve, reject) => {
                reject(new Error('Invalid User ID format!'));
            });
            return reject;
        }
        return await Transaction.find({ _user: userID })
            .select({ 
                __v: false,
                _user: false,
                _id: false
            }); // not including the recipients sub-document
    }
}