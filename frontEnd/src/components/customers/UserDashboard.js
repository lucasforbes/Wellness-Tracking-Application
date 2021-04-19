import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {Link} from "react-router-dom";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import AddWorkout from "../professional/addWorkout";
import AllExercises from "./AllExercises";
import AllDiets from "./AllDiets";
import PreviousWorkouts from "./PreviousWorkouts";
import PreviousDiets from "./PreviousDiets";
import Chat from "../chat/chat";
import Statistics from "./Statistics";
import Recommnedations from "./Recommendations";

export default function UserDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");
    const [allExercises,setAllExercises] = useState();
    const [allDiets,setAllDiets] = useState();

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();
    const [stats,setStats] = useState();

    const [previouslyAddedDiets,setPreviouslyAddedDiets] = useState();


    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))

    })

    useEffect(()=>{

        // axios.get('https://bloom-wellness-back.herokuapp.com/findAllExersizes', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }).then(function (response) {
        //     // handle success
        //     console.log("allExercises",response);
        //     setAllExercises(response.data);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        axios.get('https://bloom-flask-app.herokuapp.com/getAllExersize', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("allExercises",response);
            setAllExercises(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('https://bloom-flask-app.herokuapp.com/getAllDiet', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("allDiets",response);
            setAllDiets(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })



        axios.get('https://bloom-flask-app.herokuapp.com/getSubscribeByEmail?email='+localStorage.getItem("email"), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("All subscriptions",response);
            setPreviouslyAddedWorkouts(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('https://bloom-flask-app.herokuapp.com/getSubscribeByEmailDiet?email='+localStorage.getItem("email"), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("All subscriptions",response);
            setPreviouslyAddedDiets(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })


        // axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailUser?email="+localStorage.getItem("email")).
        // then((res)=>{
        //     setStats(res.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })


    },[])


    const [rerenderAllExe,setRerenderAllExercise] = useState(true);

    const [rerenderPreviousWorkouts,setRerenderPreviousWorkouts] = useState(true);
    const [rerenderPreviousDiets,setRerenderPreviousDiets] = useState(true);

    const subscribedCallback=()=>{
        axios.get('https://bloom-flask-app.herokuapp.com/getAllExersize', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("allExercises",response);
            setAllExercises(response.data);
            setRerenderAllExercise(!rerenderAllExe)
            setRerenderPreviousWorkouts(!rerenderPreviousWorkouts)
        })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('https://bloom-flask-app.herokuapp.com/getSubscribeByEmail?email='+localStorage.getItem("email"), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("All subscriptions",response);
            setPreviouslyAddedWorkouts(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })


        // axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailUser?email="+localStorage.getItem("email")).
        // then((res)=>{
        //     setStats(res.data)
        // }).catch((err)=>{
        //     console.log(err);
        // })


    }


    const [rerenderAllDiet,setRerenderAllDiet] = useState(true);

    const subscribedCallbackDiet=()=>{

        axios.get('https://bloom-flask-app.herokuapp.com/getAllDiet', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("allDiets",response);
            setAllDiets(response.data);
            setRerenderAllDiet(!rerenderAllDiet)
            setRerenderPreviousDiets(!rerenderPreviousDiets)
        })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('https://bloom-flask-app.herokuapp.com/getSubscribeByEmailDiet?email='+localStorage.getItem("email"), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("All subscriptions",response);
            setPreviouslyAddedDiets(response.data);
        })
            .catch(function (error) {
                console.log(error);
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

                   <Tabs defaultActiveKey="enrolled" style={{backgroundColor: 'lightblue', fontFamily: 'Cursive', marginTop: '10px', borderTop: '6px double white',borderLeft: '5px solid white', borderRight: '5px solid white'}}>

                       <Tab eventKey="enrolled" title="Enrolled Workouts" style = {{backgroundColor: 'lightGreen', color: 'white', fontFamily:'cursive',bordercolor: 'white',border: 'solid',paddingLeft:'5px'}}>

                           <h4 style={{textAlign: 'center', fontSize: '200%', textDecoration:'underline',fontWeight: '600'}}>  Your Enrolled Workouts </h4>

                           {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?
                               <PreviousWorkouts key={rerenderPreviousWorkouts} data={previouslyAddedWorkouts} callBack={subscribedCallback}/>
                               :
                               <>
                                   <h6> None previously added Workouts </h6>
                               </>
                           }




                       </Tab>

                       <Tab eventKey="market" title="MarketPlace of Workout Plans" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>

                           {allExercises?<AllExercises key={rerenderAllExe} data={allExercises} callBack={subscribedCallback}/> :<></>}



                       </Tab>



                       <Tab eventKey="enrolledDiets" title="Enrolled Diets" style = {{backgroundColor: 'lightgreen', color: 'white', fontFamily:'cursive',bordercolor: 'white',border: 'solid'}}>

                           <h4 style={{textAlign: 'center', fontSize: '200%', textDecoration:'underline',fontWeight: '600'}}>  Your Enrolled Workouts </h4>

                           {previouslyAddedDiets && previouslyAddedDiets.length > 0 ?
                                   <>
                                       <PreviousDiets key={rerenderPreviousDiets} data={previouslyAddedDiets} callBack={subscribedCallbackDiet}/>
                                   </>

                               :
                               <>
                                   <h6> None previously added Diets </h6>
                               </>
                           }

                       </Tab>

                       <Tab eventKey="marketDiet" title="MarketPlace of Diet Plans" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>

                           {allDiets?<AllDiets key={rerenderAllDiet} data={allDiets} callBack={subscribedCallbackDiet}/> :<></>}

                       </Tab>



                       {/*<Tab eventKey="profile" title="Statistics"   style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive',color:'white'}}>*/}
                       {/*    Stats*/}
                       {/*    <Card style={{backgroundColor:'lightgreen'}}>*/}
                       {/*        <Card.Body>*/}
                       {/*            <h5> Total Subscribed  {stats? stats.totalUsers:""}*/}
                       {/*                <br/>*/}
                       {/*                <p>*/}
                       {/*                    Total Calories Burned {stats ? stats.caloriesBurned:""}*/}
                       {/*                </p>*/}
                       {/*            </h5>*/}
                       {/*        </Card.Body>*/}
                       {/*    </Card>*/}


                       {/*</Tab>*/}


                       <Tab eventKey="Stats"  title={"Stats"}>
                           <Statistics/>
                       </Tab>

                       <Tab eventKey="Recommedations"  title={"Recommendations"}>
                                    <Recommnedations/>
                       </Tab>

                       <Tab eventKey="Chat"  title={"Chat"}>
                           {/*<Chat/>*/}
                       </Tab>

                   </Tabs>





               </div>





           </div>


        </>
    )

}