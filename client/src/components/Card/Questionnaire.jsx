import React, { Component } from 'react';
import Card from './Card';
import { Grid, Row, Col, Table } from 'react-bootstrap';

export class Questionnaire extends Card {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    addQuestion() {
        console.log("My work is to add a question");
    }
}

export default Questionnaire;
