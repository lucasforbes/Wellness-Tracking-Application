import React from "react";
import {Card} from 'react-bootstrap';
//this is a test
//test/test
import {TextField} from '@material-ui/core/';

export default function Homepage(){
    return(
        <Card style = {{ width: '18rem' }} >
            <Card.Header> Homepage</Card.Header>
            <Card.Title>Welcome to our wellness tracker</Card.Title>
            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.business-opportunities.biz%2Fwp-content%2Fuploads%2F2016%2F09%2Fwelcome_sign.jpe&f=1&nofb=1" />

            <Card.Body>

                <Card.Text>
                    Welcome to chronnest Wellness tracker on the market
                </Card.Text>
            </Card.Body>
        </Card>
    )
}