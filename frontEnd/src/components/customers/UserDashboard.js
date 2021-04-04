import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {Link} from "react-router-dom";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import AddWorkout from "../professional/addWorkout";
import AllExercises from "./AllExercises";

export default function UserDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");
    const [allExercises,setAllExercises] = useState();

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();
    const [stats,setStats] = useState();

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


        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailUser?email="+localStorage.getItem("email")).
        then((res)=>{
            setStats(res.data)
        }).catch((err)=>{
            console.log(err);
        })


    },[])


    const [rerenderAllExe,setRerenderAllExercise] = useState(true);

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


        axios.get("https://bloom-flask-app.herokuapp.com/getStatsByEmailUser?email="+localStorage.getItem("email")).
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
                    Welcome
                    {/*{firstName?firstName:""}*/}
                </div>
            </div>


            <Tabs defaultActiveKey="enrolled" style={{backgroundColor:'grey', }}>

                <Tab eventKey="enrolled" title="Enrolled">

                  <h4>  Your Enrolled Workouts </h4>

                    {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{return(
                            <>
                                <Card>
                                    <Card.Body>
                                        <div className={"row"}>
                                            <div className={"col-md-8"}>
                                                <h4>{workouts.title}</h4>
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
                            <h6> None previously added Workouts </h6>
                        </>
                    }

                </Tab>

                <Tab eventKey="market" title="MarketPlace" align={"left"} style={{backgroundColor: 'lightgrey'}}>

                    {allExercises?<AllExercises key={rerenderAllExe} data={allExercises} callBack={subscribedCallback}/> :<></>}



                </Tab>


                <Tab eventKey="profile" title="Statistics">
                    Stats
                    <Card>
                        <Card.Body>
                            <h5> Total Subscribed  {stats? stats.totalUsers:""}
                                <br/>
                                <p>
                                  Total Calories Burned {stats ? stats.caloriesBurned:""}
                                </p>
                            </h5>
                        </Card.Body>
                    </Card>


                </Tab>
            </Tabs>





        </>
    )

}