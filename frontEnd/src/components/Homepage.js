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
            <div className={'container-fluid'}>
                <div className={'row'} style = {{width: '',  overflow: 'hidden', minHeight: '335px', backgroundColor: 'lightGreen'}}>
                    <Card style = {{width: '100%', height:'100%', minHeight:'0'}} className="bg-dark text-white">
                        <Card.Img variant={'top'} src="lily.jpg" alt="Card image" />
                        <Card.ImgOverlay style = {{width: '100%'}}>

                            <div className={'row'}>
                                <div className={'col'} style = {{}}>

                                    <Card.Title style={{ fontSize: '8vw', textAlign: 'center', color: 'White' ,position: 'relative', bottom: '1vw',fontFamily: 'Cursive'}}>Bloom Wellness</Card.Title>

                                </div>

                            </div>

                            <div className={'row'} style ={{minHeight:'900px'}} >
                                <div className={'col-xs-6'} style = {{ color: 'black', overflow: 'hidden', marginLeft:'auto',marginRight: 'auto', marginTop: '1vw'}}>
                                    <Login/>
                                </div>

                            </div>


                        </Card.ImgOverlay>
                    </Card>
                </div>

                <div className={'row'} style = {{fontSize: "200%",}}>
                    <Card style={{backgroundColor: 'grey', width: '100%', height: '40px'}}>

                    </Card>
                </div>

                <div className={'row'} style={{backgroundColor: 'lightgrey', borderStyle: 'square', padding: '3%'}}>

                    <div className={'col-md-4'} style={{padding: '40px'}}>
                        <Card style={{minHeight: '350px' ,overflow: 'hidden',width: '85%', borderColor: 'Red Orange', borderWidth: '7px', height:'85%', marginRight: 'auto',marginLeft: 'auto',fontFamily: 'Cursive'}}>
                            <Card.Img style={{height: '70%'}} variant="top" src="Exercise_Icon.jpg"/>
                            <Card.Body>
                                <Card.Title style = {{fontSize:'200%'}}>Exercise Programs</Card.Title>
                                <Card.Subtitle style = {{fontSize:'150%'}}  className="mb-2 text-muted">Train Well</Card.Subtitle>
                                <Card.Text>Find exercise programs here</Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className={'col-md-4'}  style={{padding: '40px'}}>
                        <Card style={{ minHeight: '350px', overflow: 'hidden', width: '85%', borderWidth: '7px', borderColor: 'Blue Green', marginRight: 'auto',marginLeft: 'auto', height: '85%',fontFamily: 'Cursive'}} bg='light'>
                            <Card.Img style={{height: '70%'}} variant="top" src="forksandknivesss.jpg"/>
                            <Card.Body>
                                <Card.Title style = {{fontSize:'200%'}}>Diet Programs</Card.Title>
                                <Card.Subtitle style = {{fontSize:'150%'}}  className="mb-2 text-muted">Eat Well</Card.Subtitle>
                                <Card.Text>Find diet programs here</Card.Text>

                            </Card.Body>
                        </Card>
                    </div>

                    <div className={'col-md-4'}  style={{padding: '40px'}}>
                        <Card style={{ minHeight: '350px', overflow: 'hidden',width: '85%', borderColor: 'Purple Blue', borderWidth: '7px', height:'85%',  marginRight: 'auto',marginLeft: 'auto',fontFamily: 'Cursive'}} bg='light'>
                            <Card.Img style={{height: '70%'}} variant="top" src="./Wellness_Icon.jpg"/>
                            <Card.Body>
                                <Card.Title style = {{fontSize:'200%'}}>Wellness Programs</Card.Title>
                                <Card.Subtitle style = {{fontSize:'150%'}} className="mb-2 text-muted">Be Well</Card.Subtitle>
                                <Card.Text>Access to wellness programs</Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className={'row'} style = {{fontSize: "200%"}}>
                    <Card style={{backgroundColor: 'grey', width: '100%', height: '40px'}}>

                    </Card>
                </div>

                <div className={'row'} style={ {marginLeft:'', backgroundColor: 'lightgreen'}}>
                    <Form style={{width: '80vw', border: 'solid',borderColor: 'lightgrey', padding: '2%', marginLeft: '10vw', marginTop:'20px' ,marginBottom: '20px',fontFamily: 'Cursive', backgroundColor: 'lightblue'}}>
                        <header style={{ fontSize: '200%', color: 'black'}}>Contact Us</header>

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
                </div>


            </div>



        </>
    )
}



