import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs, TabContainer} from "react-bootstrap";
import Login from "../registeration/login";



export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");

    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))


    })


    return(

        <>
            <div className={'container-fluid'} style={{backgroundColor: 'lightgreen', height: '100vh'}}>

                <div className={'row'} style = {{width: '',  overflow: 'hidden', minHeight: '80px', backgroundColor: 'lightGreen', fontSize:'4vw', fontFamily: 'Cursive'}}>
                    <Card style = {{width: '100%', height:'8vw', minHeight:'0'}} className="bg-dark text-white">
                        <Card.Img variant={'top'} src="./ocean_waves_in_blue-1920x1200.jpg" alt="Card image" />
                        <Card.ImgOverlay style = {{width: '100%'}}>
                            <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-0vw'}}>
                                Welcome {firstName?firstName:""}
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                </div>

                <div className={'flex-row'} >
                    <Tabs defaultActiveKey="history" style={{backgroundColor: 'lightgrey', fontFamily: 'Cursive', marginTop: '10px'}}>

                        <Tab eventKey="history" title="Inventory" style = {{backgroundColor: 'blue', color: 'red'}}>
                            <header style={{textAlign: 'center'}}> workouts</header>
                        </Tab>

                        <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'blue'}}>
                            <AddWorkout/>
                        </Tab>

                        <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgrey'}}>
                            Stats
                        </Tab>

                    </Tabs>

                </div>










            </div>










        </>
    )

}

