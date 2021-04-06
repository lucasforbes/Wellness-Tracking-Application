import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs, TabContainer, Button} from "react-bootstrap";
import axios from "axios";
import AddDiet from "./addDiet";
import Modal from 'react-modal';

export default function ProfessionalDashboard(props){


    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");

    const [professionalEmail,setProfessionalEmail] = useState("");

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();
    const [stats,setStats] = useState();

    const[previouslyAddedDiets,setPreviouslyAddedDiets] = useState();
    const [statsDiet,setStatsDiet] = useState();


    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const [selectedExercise,setSelectedExercise] = useState("");

    const handleAction = value => {
        openModal()
        setSelectedExercise(value)
        console.log("Value Selected",value);
    }

    function closeModal(){
        setIsOpen(false);
    }

    useEffect(()=>{

        // setFirstName(localStorage.getItem("userFirstName"))
        setProfessionalEmail(localStorage.getItem("email"))

        //call for all workouts and workout stats
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


        // calls for all diet and diet stats
        axios.get("https://bloom-flask-app.herokuapp.com/getDietByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setPreviouslyAddedDiets(res.data)
        }).catch((err)=>{
            console.log(err);
        })

        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailDiet?email="+localStorage.getItem("email")).
        then((res)=>{
            setStatsDiet(res.data)
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

    const deleteDiet=(id)=>{


        if (window.confirm("Delete the Diet Plan ?")) {
            axios.post("https://bloom-flask-app.herokuapp.com/deleteDiet",{
                id: id
            }).
            then((res)=>{
                axios.get("https://bloom-flask-app.herokuapp.com/getDietByEmail?email="+localStorage.getItem("email")).
                then((res)=>{
                    setPreviouslyAddedDiets(res.data)
                }).catch((err)=>{
                    alert("Error fetching Diets")
                    console.log(err);
                })

                axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailDiet?email="+localStorage.getItem("email")).
                then((res)=>{
                    setStatsDiet(res.data)
                }).catch((err)=>{
                    console.log(err);
                })


            }).catch((err)=>{
                alert("Error while trying to delete the value")
            })
        }


    }


    //callback when a workout is added
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

    //callback when a diet is added
    const addedDiet=()=>{
        axios.get("https://bloom-flask-app.herokuapp.com/getDietByEmail?email="+localStorage.getItem("email")).
        then((res)=>{
            setPreviouslyAddedDiets(res.data)
        }).catch((err)=>{
            alert("Error fetching Diets")
            console.log(err);
        })

        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailDiet?email="+localStorage.getItem("email")).
        then((res)=>{
            setStatsDiet(res.data)
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

                        <Tab eventKey="history" title="Inventory" style = {{backgroundColor: 'lightblue', color: 'red'}}>
                            <header style={{textAlign: 'center', color: 'white', fontSize: '200%'}}> Your Workouts</header>

                            <br/>

                            {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{return(
                                    <>
                                        <Card>
                                            <Card.Body style={{backgroundColor: 'lightgreen'}}>
                                                <div className={"row"} >
                                                    <div className={"col-md-8"}>
                                                        <h4 style={{color:'white'}}>{workouts.title}</h4>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="info" type={"button"} onClick={()=>handleAction(workouts)}> View </Button>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteWorkout(workouts._id)}> Delete </Button>
                                                    </div>


                                                    <div className={"col-md-12"} style={{color: 'dodgerblue', fontSize:'80%'}}>
                                                        <p>{workouts.description}</p>
                                                    </div>

                                                    <p></p>
                                                </div>
                                            </Card.Body>

                                        </Card>

                                        <Modal  isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                        >
                                           <>

                                            <div className={"row"}>
                                                <div className={"col-md-5"}>
                                                    <h4>  {selectedExercise.title} </h4>
                                                </div>

                                                <div className={"col-md-8"}>
                                                    <b> Description: </b>    {" "+selectedExercise.description}
                                                </div>

                                                {selectedExercise.activityList && selectedExercise.activityList.length > 0 ?

                                                    selectedExercise.activityList.map((item,id)=>{
                                                        return (
                                                            <>

                                                                <div className={"col-md-5"}>

                                                                    <i>Activity: </i> {item.activityName} <br/>
                                                                    {"Description: " +item.activityDescription + "  Total Duration: "+item.totalDuration} <br/>
                                                                    {"Sets: "+item.activitySets +" "+ "Reps:  "+item.activityReps} <br/>
                                                                    {"Body Parts Targeted: "+item.bodyPartsTargeted+" Tools: "+item.equipmentNeeded} <br/>

                                                                    {"videoLink :"}< a href={item.videoLink?item.videoLink:""} > here</a>

                                                                </div>
                                                            </>
                                                        )
                                                    }):""
                                                }


                                                <br/>



                                            </div>

                                            <Button onClick={closeModal}> Close </Button>
                                            </>
                                        </Modal>


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

                            {previouslyAddedDiets && previouslyAddedDiets.length > 0 ?previouslyAddedDiets.map((diets,index)=>{return(
                                    <div id={index}>
                                        <Card>
                                            <Card.Body>
                                                <div className={"row"}>
                                                    <div className={"col-md-8"}>
                                                        <h4>{diets.title}</h4>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="warning" type={"button"}> Edit </Button>
                                                    </div>

                                                    <div className={"col-md-1"}>
                                                        <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteDiet(diets._id)}> Delete </Button>
                                                    </div>


                                                    <div className={"col-md-12"}>
                                                        <p>{diets.description}</p>
                                                    </div>

                                                    <p></p>
                                                </div>
                                            </Card.Body>

                                        </Card>
                                    </div>
                                )
                                }):
                                <>
                                    <h4> None previously added Diet Plans </h4>
                                </>
                            }

                        </Tab>


                        <Tab eventKey="addDiet" title="Add Diet" style={{backgroundColor: 'lightgrey'}}>
                            <AddDiet addedNewDiet={addedDiet}/>
                        </Tab>

                        <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>
                            Stats

                            <Card>
                                <Card.Body style={{backgroundColor: 'lightgreen'}}>

                                    <h5 > Total Subscribers for Workout {stats? stats.totalUsers:""}
                                        <br/>
                                        <p>
                                            <br/> Total Workouts {" "} {stats ? stats.countWorkouts:""}
                                            <br/>Average users per workout {" "}
                                            {stats ? stats.averageUsers:""}
                                        </p>

                                    </h5>
                                </Card.Body>
                            </Card>

                            <br/>

                            <Card>
                                <Card.Body style={{backgroundColor: 'lightgreen'}}>

                                    <h5 > Total Subscribers for Diet {statsDiet? statsDiet.totalUsers:""}
                                        <br/>
                                        <p>
                                            <br/> Total Diets {" "} {statsDiet ? statsDiet.countDiet:""}
                                            <br/>Average users per workout {" "}
                                            {stats ? statsDiet.averageUsers:""}
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
