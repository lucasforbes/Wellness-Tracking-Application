import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs, TabContainer, Button} from "react-bootstrap";
import axios from "axios";
import AddDiet from "./addDiet";
import Modal from 'react-modal';
import Creatorchat from "../chat/CreatorChat";



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


    //For Workout Modal
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


    //For Diet Modal
    const [modalIsOpenDiet,setIsOpenDiet] = React.useState(false);
    function openModalDiet() {
        setIsOpenDiet(true);
    }

    function closeModalDiet(){
        setIsOpenDiet(false);
    }

    const [selectedDiet,setSelectedDiet] = useState("");

    const handleActionDiet = value => {
        openModalDiet()
        setSelectedDiet(value)
        console.log("Diet Selected",value);
    }

    function closeModalDiet(){
        setIsOpenDiet(false);
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

                        <Tab eventKey="history" title="Workout Inventory" style = {{backgroundColor: 'lightgreen', color: 'white', fontFamily:'cursive',bordercolor: 'white',border: 'solid'}}>
                            <header style={{textAlign: 'center', fontSize: '200%', textDecoration:'underline',fontWeight: '600'}}> Your Workouts</header>

                            <br/>


                            <div className={"row"} style={{paddingBottom:'10px'}}>

                            {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{

                                if(workouts.approved) {
                                    return (

                                        <div id={index} className={"col-4"}>
                                            <Card>
                                                <Card.Body style={{backgroundColor: 'lightblue'}}>

                                                    <div className={"row"}>

                                                        <div className={"col-md-3"}>

                                                            {workouts.file ? <img style={{width: '100%', height: '95%'}}
                                                                                  src={'https://bloom-flask-app.herokuapp.com/file/' + workouts.file}
                                                                                  alt={"No image"}/> :
                                                                <img style={{width: '90%', height: '80%'}}
                                                                     src={process.env.PUBLIC_URL + 'Bloom.png'}
                                                                     alt={"No image"}/>}

                                                        </div>
                                                        <div className={"col-md-9"}>
                                                            <h4 style={{color: 'white'}}>{workouts.title}</h4>
                                                            <br/>
                                                            <p>{workouts.description}</p>
                                                        </div>

                                                        <div
                                                            className={"card-header text-white bg-primary col-md-4"}> Subscribers {workouts.userIdsToExersizesSubscribed.length}</div>

                                                        <div className={"col-md-8"}>
                                                            <Button style={{width: "80px"}} variant="info"
                                                                    type={"button"}
                                                                    onClick={() => handleAction(workouts)}> View </Button>
                                                            {" "}
                                                            <Button style={{width: "80px"}} variant="danger"
                                                                    type={"button"}
                                                                    onClick={() => deleteWorkout(workouts._id)}> Delete </Button>
                                                        </div>


                                                    </div>
                                                </Card.Body>

                                            </Card>


                                        </div>

                                    )
                                }
                                else{

                                        return(

                                            <div id={index} className={"col-4"}>

                                                <Card>
                                                    <Card.Body style={{backgroundColor: '#EF5350'}}>


                                                        <div className={"row"} >

                                                            <div className={"col-md-3"}>

                                                                {workouts.file ?  <img style={{width:'100%',height:'95%'}} src={'https://bloom-flask-app.herokuapp.com/file/'+workouts.file} alt={"No image"}/> :
                                                                    <img style={{width:'90%',height:'80%'}} src={process.env.PUBLIC_URL + 'Bloom.png'} alt={"No image"}/>}

                                                            </div>
                                                            <div className={"col-md-9"}>
                                                                <div className={"bg-dark text-white"}  style={{paddingLeft:'2px'}}> Not Approved </div>
                                                                <h4 style={{color:'white'}}>{workouts.title}</h4>
                                                                <br/>
                                                                <p>{workouts.description}</p>
                                                            </div>

                                                            <div className={"card-header text-white bg-primary col-md-4"}> Subscribers  {workouts.userIdsToExersizesSubscribed.length}</div>

                                                            <div className={"col-md-8"}>
                                                                <Button style={{width:"80px"}} variant="info" type={"button"} onClick={()=>handleAction(workouts)}> View </Button>
                                                                {" "}
                                                                <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteWorkout(workouts._id)}> Delete </Button>
                                                            </div>


                                                        </div>
                                                    </Card.Body>

                                                </Card>




                                            </div>

                                        )
                                    }


                                }):
                                <>
                                    <h4 style={{ position:'relative',right:'-30px',fontSize: '200%', fontWeight: '420'}}> No previously added Workouts </h4>
                                </>
                            }

                            </div>



                            <Modal  isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                            >
                                <>


                                    <div className={"row"} style={{overflowY:'scroll',height:'400px'}}>


                                        <div className={"col-md-5"}>

                                            <div className={"bg-warning text-white"}> Note: {" "+ selectedExercise.notes?selectedExercise.notes:""}</div>
                                            <h4>  {selectedExercise.title} </h4>
                                            <b> Description: </b>    {" "+selectedExercise.description}
                                            {selectedExercise.file ?  <img  style={{maxWidth:'600px',maxHeight:'800px'}} src={'https://bloom-flask-app.herokuapp.com/file/'+selectedExercise.file} alt={"No image"}/> :
                                                <img style={{maxWidth:'600px',maxHeight:'800px'}} src={process.env.PUBLIC_URL + 'Bloom.png'} alt={"No image"}/>}

                                        </div>

                                        <div className={"col-md-6"}>
                                            {selectedExercise.activityList && selectedExercise.activityList.length > 0 ?

                                                selectedExercise.activityList.map((item,id)=>{
                                                    return (
                                                        <>

                                                            <div className={"col-md-12 card bg-transparent"}  >

                                                                <i>Activity: </i> {item.activityName} <br/>
                                                                {"Description: " +item.activityDescription + "  Total Duration: "+item.totalDuration} <br/>
                                                                {"Sets: "+item.activitySets +" "+ "Reps:  "+item.activityReps} <br/>
                                                                {"Body Parts Targeted: "+item.bodyPartsTargeted+" Tools: "+item.equipmentNeeded} <br/>

                                                                {"videoLink :"}< a href={item.videoLink?item.videoLink:""} target={"_blank"}> here</a>

                                                            </div>
                                                        </>
                                                    )
                                                }):""
                                            }

                                        </div>



                                        <br/>


                                    </div>

                                    <br/>
                                    <Button onClick={closeModal} variant={'danger'}> Close </Button>
                                </>
                            </Modal>

                        </Tab>


                        <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>
                            <AddWorkout addedNewWorkout={addedWorkout}/>
                        </Tab>


                        <Tab eventKey="diethistory" title="Diet Inventory" style = {{backgroundColor: 'lightgreen', color: 'white', fontFamily: 'cursive', border: 'solid', borderColor:'white'}}>
                            <header style={{textAlign: 'center', fontSize: '200%', fontWeight: '600',textDecoration:'underline'}}>Your Diets</header>

                            <br/>


                            <div className={"row"} style={{paddingBottom:'10px'}}>

                            {previouslyAddedDiets && previouslyAddedDiets.length > 0 ?previouslyAddedDiets.map((diets,index)=>{


                                    if(diets.approved) {
                                        return (
                                            <div id={index} className={"col-4"}>

                                        <Card>

                                            <Card.Body style={{backgroundColor: 'lightblue'}}>


                                                <div className={"row"} >

                                                    <div className={"col-md-3"}>

                                                        {diets.file ?  <img style={{width:'100%',height:'95%'}} src={'https://bloom-flask-app.herokuapp.com/file/'+diets.file} alt={"No image"}/> :
                                                            <img style={{width:'90%',height:'80%'}} src={process.env.PUBLIC_URL + 'Bloom.png'} alt={"No image"}/>}

                                                    </div>

                                                        <div className={"col-md-8"}>
                                                            <h4>{diets.title}</h4>
                                                            <p>{diets.description}</p>
                                                        </div>

                                                        <div
                                                        className={"card-header text-white bg-primary col-md-4"}> Subscribers {diets.userIdsToExersizesSubscribed.length}</div>

                                                    <div className={"col-md-8"}>
                                                            <Button style={{width:"80px"}} variant="info" type={"button"} onClick={()=>handleActionDiet(diets)}> View </Button>
                                                            {" "}
                                                            <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteDiet(diets._id)}> Delete </Button>
                                                        </div>


                                                </div>
                                                </Card.Body>

                                            </Card>



                                        </div>
                                        )
                                }
                                else{
                                        return (
                                            <div id={index} className={"col-4"}>

                                                <Card>

                                                    <Card.Body style={{backgroundColor: '#EF5350'}}>


                                                        <div className={"row"} >

                                                            <div className={"col-md-3"}>

                                                                {diets.file ?  <img style={{width:'100%',height:'95%'}} src={'https://bloom-flask-app.herokuapp.com/file/'+diets.file} alt={"No image"}/> :
                                                                    <img style={{width:'90%',height:'80%'}} src={process.env.PUBLIC_URL + 'Bloom.png'} alt={"No image"}/>}

                                                            </div>

                                                            <div className={"col-md-8"}>
                                                                <div className={"bg-dark text-white"}  style={{paddingLeft:'2px'}}> Not Approved </div>
                                                                <h4>{diets.title}</h4>
                                                                <p>{diets.description}</p>
                                                            </div>

                                                            <div
                                                                className={"card-header text-white bg-primary col-md-4"}> Subscribers {diets.userIdsToExersizesSubscribed.length}</div>

                                                            <div className={"col-md-8"}>
                                                                <Button style={{width:"80px"}} variant="info" type={"button"} onClick={()=>handleActionDiet(diets)}> View </Button>
                                                                {" "}
                                                                <Button style={{width:"80px"}} variant="danger" type={"button"} onClick={()=>deleteDiet(diets._id)}> Delete </Button>
                                                            </div>


                                                        </div>
                                                    </Card.Body>

                                                </Card>



                                            </div>
                                        )
                                    }

                            }):
                                <>
                                    <h4 style={{fontSize: '200%',fontWeight:'420', position:'relative',right:'-30px'}}>No previously added Diet Plans </h4>
                                </>
                            }

                            </div>


                            <Modal  isOpen={modalIsOpenDiet}
                                    onRequestClose={closeModalDiet}
                                    style={customStyles}
                            >
                                <>

                                    <div className={"row"} style={{overflowY:'scroll',height:'400px'}}>
                                        <div className={"col-md-4"}>
                                            <h4>  {selectedDiet.title} </h4>
                                            <b> Description: </b>    {" "+selectedDiet.description}
                                            {selectedDiet.file ?  <img  style={{maxWidth:'400px',maxHeight:'400px'}} src={'https://bloom-flask-app.herokuapp.com/file/'+selectedDiet.file} alt={"No image"}/> :
                                                <img style={{maxWidth:'600px',maxHeight:'800px'}} src={process.env.PUBLIC_URL + 'Bloom.png'} alt={"No image"}/>}
                                        </div>

                                        <div className={"col-md-6"}>
                                            {selectedDiet.dietList && selectedDiet.dietList.length > 0 ?

                                                selectedDiet.dietList.map((diet,id)=>{
                                                    return (
                                                        <div id={index} className={"col-md-12 card"} style={{borderWidth:'5px'}}>

                                                            <i>Item: </i> {diet.item}
                                                            <p>Serving Size {" "+diet.servingSize+" "} <br/>
                                                                Fat Contains {" "+diet.fat+" "} <br/>
                                                                Carbs Contains {" "+diet.carbs+" "} <br/>
                                                                Total Calories {" "+diet.calories+" "} <br/>
                                                                Protein Contains {" "+diet.protein+" "}<br/>
                                                            </p>

                                                        </div>
                                                    )
                                                }):""
                                            }
                                        </div>





                                        <br/>



                                    </div>

                                    <Button onClick={closeModalDiet} variant={'danger'}> Close Diet </Button>
                                </>
                            </Modal>



                        </Tab>


                        <Tab eventKey="addDiet" title="Add Diet" style={{backgroundColor: 'lightgreen',border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>

                                <AddDiet addedNewDiet={addedDiet}/>

                        </Tab>

                        <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive',color:'white',paddingTop:'10px',paddingLeft:'20px'}}>

                            <div className={"row"}>
                                <div className={"col-md-3"}>
                                    <Card  style={{ width: '18rem',fontSize:'20px'}}
                                           className="mb-2"
                                           bg={'primary'}
                                    >

                                        <Card.Body>

                                            <div className={"card-header"}>Workout Stats</div>

                                            <div className={"card-header text-white bg-warning"} > Total Subscribers {stats? stats.totalUsers:""} </div>
                                            <br/>

                                            <div className={"card-header text-white bg-success"} >
                                                 Plans Added {" "} {stats ? stats.countWorkouts:""}
                                                <br/>Average Count{" "}
                                                {stats ? parseFloat(stats.averageUsers).toFixed(2):""}
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className={"col-md-3"}>
                                    <Card style={{ width: '18rem',fontSize:'20px'}}
                                          className="mb-2"
                                          bg={'primary'}>
                                        <Card.Body>

                                            <div className={"card-header"}>Diet Stats</div>

                                            <div className={"card-header bg-danger"} > Total Subscribers {statsDiet? statsDiet.totalUsers:""} </div>
                                                <br/>

                                                <div className={"card-header text-white bg-success"}>
                                                     Total Diet Plans {" "} {statsDiet ? statsDiet.countDiet:""}
                                                    <br/>Average users per Diet {" "}
                                                    {statsDiet ? parseFloat(statsDiet.averageUsers).toFixed(2):""}
                                                </div>

                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className={"col-md-4"}>

                                </div>
                            </div>



                            <br/>



                        </Tab>

                        <Tab title={"Chat"} eventKey={"Chat"}>
                            {/*<Creatorchat/>*/}

                        </Tab>

                    </Tabs>

                </div>










            </div>










        </>
    )

}
