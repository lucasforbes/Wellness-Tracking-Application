import React from "react";
import {Card, Form, Button, Container, Row, Col, ModalFooter} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import ContactUs from "./registeration/ContactUs";
import HomePageMainCard from "./registeration/HomePageMainCard";
import {CardHeader} from "@material-ui/core";


export default function Homepage(){
    return(
        <>
            <Card className="bg-dark text-white">
                <Card.Img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1" alt="Card iimage" />
                <Card.ImgOverlay>;
                    <Card.Title style={{ fontSize: '1000%', border: '2000px', textAlign: 'center', color: 'Blue'}}>Bloom Wellness</Card.Title>
                    <Card.Text  style={{ fontSize: '200%', textAlign: 'center', color: 'white'}}>
                        Eat well, Train well, Be well
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
            <Container fluid  style={{backgroundColor: 'white'}}>
                <Row>
                    <Col>
                        want to add spacing here
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <Card margin = '500px!important' style={{ width: '18rem', borderWidth: '2px', borderColor: 'Blue'}} bg = 'light'>
                            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.forksoverknives.com%2Fwp-content%2Fuploads%2Fdiet-brain-health1.jpg&f=1&nofb=1" />
                            <Card.Body>
                                <Card.Title>Diet Programs</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Eat Well</Card.Subtitle>
                                <Card.Text>
                                    Find diet programs here
                                </Card.Text>
                                <Card.Link href="#">click here</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem',  borderColor: 'red', borderWidth:'2px'}} bg = 'light'>
                            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.nLTQnuDatk12dJ6zXz2yRwHaFS%26pid%3DApi&f=1" />
                            <Card.Body>
                                <Card.Title>Exercise Programs</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Train Well</Card.Subtitle>
                                <Card.Text>
                                    Find exercise programs here
                                </Card.Text>
                                <Card.Link href="#">click here</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem', borderColor: 'yellow', borderWidth:'2px'}} bg = 'light'>
                            <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.newhope.com%2Fsites%2Fnewhope360.com%2Ffiles%2Fstyles%2Farticle_featured_retina%2Fpublic%2Fwellness-women.jpg%3Fitok%3DiHY2A9ZR&f=1&nofb=1" />
                            <Card.Body>
                                <Card.Title>Bloom Wellness</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Be Well</Card.Subtitle>
                                <Card.Text>
                                    Access to diet and exercise programs
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        want to add spacing here
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We will respond to this email when you inquiry is processed
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder={"Enter message here"}/>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ModalFooter style={{ fontSize: '70%', borderColor: 'white', color: 'grey'}}>Copyright group #6</ModalFooter>


        </>
    )

    /*return(
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
    )*/
}