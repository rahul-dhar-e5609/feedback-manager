import React, { Component } from 'react';
import { Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';

export class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="options" style={{ minWidth: '45%', display: 'block', margin: '1% 2%' }}>
                <Field
                    key={this.props.key}
                    component={SurveyField}
                    type="text"
                    placeholder="Option"
                    label="Option"
                    name="add-option"
                    fieldvalue={this.props.optionValue}
                />
            </div>
        );
    }
}

export default Option;
