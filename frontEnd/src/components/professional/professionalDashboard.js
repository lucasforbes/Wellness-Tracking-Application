import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs, TabContainer, Button} from "react-bootstrap";
import axios from "axios";
import AddDiet from "./addDiet";


export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");

    const [professionalEmail,setProfessionalEmail] = useState("");

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();
    const [stats,setStats] = useState();

    useEffect(()=>{

        // setFirstName(localStorage.getItem("userFirstName"))
        setProfessionalEmail(localStorage.getItem("email"))

        axios.get("https://bloom-flask-app.herokuapp.com/getExersizeByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setPreviouslyAddedWorkouts(res.data)
        }).catch((err)=>{
            console.log(err);
        })


        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setStats(res.data)
        }).catch((err)=>{
            console.log(err);
        })


    },[])


    const deleteWorkout=(id)=>{


        if (window.confirm("Delete the workout?")) {
            axios.post("https://bloom-flask-app.herokuapp.com/deleteExercise",{
                id: id
            }).
            then((res)=>{
                axios.get("https://bloom-flask-app.herokuapp.com/getExersizeByEmail?email="+localStorage.getItem("email")).
                then((res)=>{
                    setPreviouslyAddedWorkouts(res.data)
                }).catch((err)=>{
                    alert("Fetching Workouts")
                    console.log(err);
                })

                axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmail?email="+localStorage.getItem("email")).
                then((res)=>{
                    setStats(res.data)
                }).catch((err)=>{
                    console.log(err);
                })


            }).catch((err)=>{
                alert("Error while trying to delete the value")
            })
        }


    }


    const addedWorkout=()=>{
        axios.get("https://bloom-flask-app.herokuapp.com/getExersizeByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setPreviouslyAddedWorkouts(res.data)
        }).catch((err)=>{
            alert("Fetching Workouts")
            console.log(err);
        })

        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setStats(res.data)
        }).catch((err)=>{
            console.log(err);
        })

    }


    return(

        <>
            <div className={'container-fluid'} style={{backgroundColor: 'lightblue', height: 'auto'}}>

                <div className={'row'} style = {{width: '',  overflow: 'hidden', minHeight: '80px', backgroundColor: 'lightgrey', fontSize:'4vw', fontFamily: 'Cursive'}}>
                    <Card style = {{width: '100%', height:'8vw', minHeight:'0'}} className="bg-dark text-white">
                        <Card.Img variant={'top'} src="./ocean_waves_in_blue-1920x1200.jpg" alt="Card image" />
                        <Card.ImgOverlay style = {{width: '100%'}}>
                            <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-0vw'}}>
                                Welcome
                                {/*{firstName?firstName:""}*/}
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                </div>

                <div className={'flex-row'} style={{backgroundColor:''}} >
                    <Tabs defaultActiveKey="history" style={{backgroundColor: 'lightblue', fontFamily: 'Cursive', marginTop: '10px', borderTop: '6px double white',borderLeft: '5px solid white', borderRight: '5px solid white'}}>

                        <Tab eventKey="history" title="Workout Inventory" style = {{backgroundColor: 'lightblue', color: 'red'}}>
                            <header style={{textAlign: 'center'}}> workouts</header>

                            <br/>

                            {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{return(
                                    <>
                                        <Card>
                                            <Card.Body>
                                                <div className={"row"}>
                                                    <div className={"col-md-8"}>
                                                        <h4>{workouts.title}</h4>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="warning" type={"button"}> Edit </Button>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteWorkout(workouts._id)}> Delete </Button>
                                                    </div>


                                                    <div className={"col-md-12"}>
                                                        <p>{workouts.description}</p>
                                                    </div>

                                                    <p></p>
                                                </div>
                                            </Card.Body>

                                        </Card>
                                    </>
                                )
                                }):
                                <>
                                    <h4> None previously added Workouts </h4>
                                </>
                            }

                        </Tab>


                        <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>
                            <AddWorkout addedNewWorkout={addedWorkout}/>
                        </Tab>


                        <Tab eventKey="diethistory" title="Diet Inventory" style = {{backgroundColor: 'lightblue', color: 'red'}}>
                            <header style={{textAlign: 'center'}}> workouts</header>

                            <br/>

                            {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{return(
                                    <>
                                        <Card>
                                            <Card.Body>
                                                <div className={"row"}>
                                                    <div className={"col-md-8"}>
                                                        <h4>{workouts.title}</h4>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="warning" type={"button"}> Edit </Button>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteWorkout(workouts._id)}> Delete </Button>
                                                    </div>


                                                    <div className={"col-md-12"}>
                                                        <p>{workouts.description}</p>
                                                    </div>

                                                    <p></p>
                                                </div>
                                            </Card.Body>

                                        </Card>
                                    </>
                                )
                                }):
                                <>
                                    <h4> None previously added Diet Plans </h4>
                                </>
                            }

                        </Tab>


                        <Tab eventKey="addDiet" title="Add Diet" style={{backgroundColor: 'lightgrey'}}>
                            Add Diet
                            <AddDiet/>
                        </Tab>

                        <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgrey'}}>
                            Stats

                            <Card>
                                <Card.Body>

                                    <h5> Total Subscribers {stats? stats.totalUsers:""}
                                        <br/>
                                        <p>
                                            <br/> Total Workouts {" "} {stats ? stats.countWorkouts:""}
                                            <br/>Average users per workout {" "}
                                            {stats ? stats.averageUsers:""}
                                        </p>

                                    </h5>
                                </Card.Body>
                            </Card>

                        </Tab>

                    </Tabs>

                </div>










            </div>










        </>
    )

}

