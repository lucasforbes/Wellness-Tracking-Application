import React from "react";
import {Card, Form, Button, Row, Col, Container} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';


export default function ContactUs() {
    return (
        <>
            <Card className="bg-dark text-white">
                <Card.Img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.spineuniverse.com%2Fsites%2Fdefault%2Ffiles%2Fimagecache%2Fgallery-large%2Fwysiwyg_imageupload%2F3998%2F2015%2F08%2F11%2Fstretching_10957264_M.jpg&f=1&nofb=1" alt="Card iimage" />
                <Card.ImgOverlay>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </Card>
            <Container fluid ='md'>
                <Row>
                    <Col>Why go that way</Col>
                    <Col>What about this one</Col>
                </Row>
                <Row>
                    <Col>
                        <Card border = 'secondary' style={{ width: '18rem'}} bg = 'light'>
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
                    <Col>
                        <Card border = 'secondary' style={{ width: '18rem'}} bg = 'light'>
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
                    <Col>
                        <Card border = 'secondary' style={{ width: '18rem'}} bg = 'light'>
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


        </>
    )
}