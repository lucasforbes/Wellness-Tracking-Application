import React, {useState} from "react";
import {
    Card,
    Table,
    Form,
    FormControl,
    Button,
    Container,
    Row,
    Col,
    ModalFooter,
    Navbar,
    Nav,
    Image
} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {CardHeader} from "@material-ui/core";
import Login from "./registeration/login";

export default function Homepage() {

    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
//test
    return (
        <>

            <Row style = {{overflow: 'hidden', minHeight: '325px', backgroundColor: 'lightGreen'}}>
                <Card style = {{width: '100%', height:'100%', minHeight:'0'}} className="bg-dark text-white">
                    <Card.Img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1" alt="Card iimage" />
                    <Card.ImgOverlay style = {{width: '100%'}}>

                        <div className={'row'}>
                            <div className={'col'} style = {{}}>

                                <Card.Title style={{ fontSize: '8vw', textAlign: 'center', color: 'White' ,position: 'relative', bottom: '1vw'}}>Bloom Wellness</Card.Title>

                            </div>

                        </div>

                        <div className={'row'} style ={{minHeight:'900px'}} >
                            <div className={'col-xs-6'} style = {{ color: 'black', overflow: 'hidden', marginLeft:'auto',marginRight: 'auto', marginTop: '1vw'}}>
                                <Login/>
                            </div>

                        </div>


                    </Card.ImgOverlay>
                </Card>
            </Row>

            <Row style = {{fontSize: "200%"}}>
                <Card style={{backgroundColor: 'grey', width: '100%'}}>
                    /
                </Card>
            </Row>

            <Row style={{backgroundColor: 'lightgrey', borderStyle: 'square', padding: '3%'}}>
                <Col xs = {4}>
                    <Card style={{width: '80%', borderColor: 'Red Orange', borderWidth: '7px', height:'100%', position: 'relative', left: '9%'}}>
                        <Card.Img style={{height: '70%'}} variant="top" src="Exercise_Icon.jpg"/>
                        <Card.Body>
                            <Card.Title>Exercise Programs</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Train Well</Card.Subtitle>
                            <Card.Text>Find exercise programs here</Card.Text>
                            <Card.Link href="#">click here</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs = {4}>
                    <Card style={{width: '80%', borderWidth: '7px', borderColor: 'Blue Green', position: 'relative', left: '9%', height: '100%'}} bg='light'>
                        <Card.Img style={{height: '70%'}} variant="top" src="forksandknivesss.jpg"/>
                        <Card.Body>
                            <Card.Title>Diet Programs</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Eat Well</Card.Subtitle>
                            <Card.Text>Find diet programs here</Card.Text>
                            <Card.Link href="#">click here</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs = {4}>
                    <Card style={{width: '80%', borderColor: 'Purple Blue', borderWidth: '7px', height:'100%', position: 'relative', left: '9%'}} bg='light'>
                        <Card.Img style={{height: '70%'}} variant="top" src="./Wellness_Icon.jpg"/>
                        <Card.Body>
                            <Card.Title>Mental Wellness Programs</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Be Well</Card.Subtitle>
                            <Card.Text>Access to wellness programs</Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row style = {{fontSize: "200%"}}>
                <Card style={{backgroundColor: 'grey', width: '100%'}}>
                    /
                </Card>
            </Row>

            <Row>
                <Form style={{width: '600px', border: 'solid',borderColor: 'lightgrey', padding: '2%', margin: '4%'}}>
                    <header style={{ fontSize: '200%', color: 'grey'}}>Contact Us</header>

                    <Form.Group  controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted"> We will respond to this email when you inquiry is processed</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={"Enter message here"}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Row>



            <ModalFooter style={{fontSize: '70%', borderColor: 'white', color: 'grey'}}>Copyright group #6</ModalFooter>


        </>
    )
}



