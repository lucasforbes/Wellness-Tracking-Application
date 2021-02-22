import React from "react";
import {Card, Form, Button, CardGroup, CardDeck, CardColumns, Container, Row, Col} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';


export default function HomePageMainCard() {
    return(
        <Container fluid ='md'>
            <Row>
                <Col>Why go that way</Col>
                <Col>What about this one</Col>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>
    )

}