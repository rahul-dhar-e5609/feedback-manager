import React, { Component } from 'react';
import { Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log("[Question] Props", this.props);
        return (
            <div className="question" style={{ margin: '0% 2%' }}>
                <Field
                    component={SurveyField}
                    type="text"
                    placeholder="Add Question"
                    label="Add Question"
                    name={"q-"+this.props.index}
                    fieldvalue={this.props.question}
                />
            </div>
        );
    }
}

export default Question;
