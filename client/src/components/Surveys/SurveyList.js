import React, {Component} from 'react';
import {connect} from 'react-redux';

import { fetchSurveys } from '../../actions';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import {Card} from 'components/Card/Card.jsx';

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        //console.log("Surveys", this.props.surveys);
        return this.props.surveys.reverse().map(survey => {
            const numOfCols = 4;
            const colWidth = 12 / numOfCols;
            return (
                <Col md={colWidth} key={survey._id}>
                    <Card
                        title={survey.title}
                        content={
                            <div style={{height: '150px'}}>
                                <p>{survey.body}</p>
                                <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                            </div>
                        }
                    />
                </Col>
            );
        })
    }

    render () {
        return (
            <Grid fluid>
                <Row>
                    {this.renderSurveys()}
                </Row>
            </Grid>
        );
    }
}
function mapStateToProps ({surveys}){
    return {
        surveys
    }
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList)