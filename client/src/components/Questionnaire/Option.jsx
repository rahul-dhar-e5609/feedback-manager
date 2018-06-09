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
        console.log("[OPTIONS] Props:", this.props.option);
        return (
            <div className="options" style={{ minWidth: '45%', display: 'block', margin: '1% 2%' }}>
                <Field
                    key={this.props.index}
                    component={SurveyField}
                    type="text"
                    placeholder="Option"
                    label="Option"
                    name={"q"+this.props.qindex+"_"+"op-"+this.props.index}
                    fieldvalue={this.props.option.text}
                />
            </div>
        );
    }
}

export default Option;
