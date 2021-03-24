import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs} from "react-bootstrap";



export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");

    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))


    })


    return(

        <>

            <div className={'row'} style={ {textAlign: 'center' ,backgroundAttachment: 'fixed' , color:'white',fontSize: '3vw', height: '10vw',margin:'0px', backgroundImage: 'url(./ocean_waves_in_blue-1920x1200.jpg)'}}>
                <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-2vw'}}>
                    Welcome {firstName?firstName:""}
                </div>
            </div>



            <Tabs defaultActiveKey="history" style={{backgroundColor: 'lightgrey'}}>

                <Tab eventKey="history" title="Inventory" style = {{backgroundColor: ''}}>
                    <header style={{textAlign: 'center'}}> workouts</header>
                    <Row>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                Workout 1 here
                            </Card>
                        </Col>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                Workout 2 here
                            </Card>
                        </Col>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                Workout 3 here
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                diet 1 here
                            </Card>
                        </Col>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                diet 2 here
                            </Card>
                        </Col>
                        <Col sm = '4'>
                            <Card style={{margin:'10%'}}>
                                diett 3 here
                            </Card>
                        </Col>
                    </Row>




                </Tab>

                <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'grey'}}>
                    <AddWorkout/>
                </Tab>

                <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgrey'}}>
                    Stats
                </Tab>

            </Tabs>





        </>
    )

}

