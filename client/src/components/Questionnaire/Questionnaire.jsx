import React from 'react';
import Card from '../Card/Card.jsx';
import QuestionContainer from './QuestionContainer.jsx';

export class Questionnaire extends Card {
    
    getContents() {
        return (
            <div>
                <QuestionContainer questions={this.props.questions} {...this.props}/>
            </div>
        );
    }

    getRightHeader() {
        return (
            <button className="btn btn-success" onClick={() => {this.props.addQuestion(); return false;}} type="button">Add Question</button>
        );
    }
}

export default Questionnaire;
