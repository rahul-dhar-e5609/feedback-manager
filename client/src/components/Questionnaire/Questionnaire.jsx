import React//, { Component } 
from 'react';
import Card from '../Card/Card.jsx';
import { 
    Grid, Row, Col//, Table 
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';
import ChartistGraph from 'react-chartist';
import {dataPie, legendPie} from 'variables/Variables.jsx';
import QuestionContainer from './QuestionContainer.jsx';

export class Questionnaire extends Card {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    getContents() {
        return (
            <div>
                <QuestionContainer/>
            </div>
        );
    }

    getRightHeader() {
        return (
            <button className="btn btn-success btn-fill" type="submit">Add Question</button>
        );
    }
}

export default reduxForm({
    form: 'surveyForm',
})(Questionnaire);
