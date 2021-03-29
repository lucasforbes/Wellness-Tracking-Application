import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs, Button} from "react-bootstrap";
import axios from "axios";

export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");
    const [professionalEmail,setProfessionalEmail] = useState("");

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();
    const [stats,setStats] = useState();

    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))
        setProfessionalEmail(localStorage.getItem("email"))

        // axios.get("https://bloom-wellness-back.herokuapp.com/findExersizeByCreatorEmail/"+localStorage.getItem("email")).
        //     then((res)=>{
        //         setPreviouslyAddedWorkouts(res.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })

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

            <br/>
            <div className={'row'} style={ {textAlign: 'center' ,backgroundAttachment: 'fixed' , color:'white',fontSize: '3vw', height: '10vw',margin:'0px', backgroundImage: 'url(./ocean_waves_in_blue-1920x1200.jpg)'}}>
                <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-2vw'}}>
                    Welcome {firstName?firstName:""}
                </div>
            </div>



            <Tabs defaultActiveKey="history" style={{backgroundColor: 'lightgrey'}}>

                <Tab eventKey="history" title="Inventory" style = {{backgroundColor: ''}}>

                    <header style={{textAlign: 'center'}}> Workouts</header>
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

                <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'grey'}}>
                    <AddWorkout addedNewWorkout={addedWorkout}/>
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





        </>
    )

}

