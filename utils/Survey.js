"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var FMEnum_1 = __importDefault(require("./FMEnum"));
var Survey = mongoose.model('surveys');
var Mailer = require('../services/Mailer');
var surveyTemplate = require('../services/emailTemplates/surveyTemplate');
/**
 * This class is responsible for
 * handling the information regarding the
 * surveys
 *
 * Version 1.0.0
 * author: Rahul Dhar
 */
var FMSurvey = /** @class */ (function () {
    function FMSurvey() {
    }
    /**
     * This function is responsible for fetching
     * all the surveys of a particular user
     *
     * Version 1.0.0
     * @param userID | User ID of the owner
     */
    FMSurvey.getByUserID = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var reject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //bail if user ID is not valid
                        if (userID.trim() == FMEnum_1.default.EMPTY_STRING || typeof userID != 'string') {
                            reject = new Promise(function (resolve, reject) {
                                reject(new Error('Invalid User ID format!'));
                            });
                            return [2 /*return*/, reject];
                        }
                        return [4 /*yield*/, Survey.find({ _user: userID })
                                .select({
                                recipients: false,
                                body: false,
                                questions: false,
                                yes: false,
                                no: false,
                                _user: false,
                                lastResponded: false,
                                __v: false,
                                _id: false
                            })];
                    case 1: return [2 /*return*/, _a.sent()]; // not including the recipients sub-document
                }
            });
        });
    };
    FMSurvey.createSurvey = function (title, subject, body, recipients, questions, userID, draft) {
        if (draft === void 0) { draft = false; }
        return __awaiter(this, void 0, void 0, function () {
            var survey, mailer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Questions array: ", questions);
                        survey = new Survey({
                            title: title,
                            subject: subject,
                            body: body,
                            questions: questions,
                            recipients: FMSurvey.parseRecipientStringToArray(recipients),
                            _user: userID,
                            dateSent: Date.now()
                        });
                        if (!!draft) return [3 /*break*/, 2];
                        mailer = new Mailer(survey, surveyTemplate(survey));
                        return [4 /*yield*/, mailer.send()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, survey.save()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FMSurvey.parseRecipientStringToArray = function (recipients) {
        var receps = recipients.split(',').map(function (email) { return ({ email: email.trim() }); });
        console.log('Recepients array: ', receps);
        return receps;
    };
    return FMSurvey;
}());
exports.FMSurvey = FMSurvey;
