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

        axios.get('http://127.0.0.1:5000/getAllExersize', {
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


        axios.get('http://127.0.0.1:5000/getSubscribeByEmail?email='+localStorage.getItem("email"), {
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


    },[])


    const [rerenderAllExe,setRerenderAllExercise] = useState(true);

    const subscribedCallback=()=>{
        axios.get('http://127.0.0.1:5000/getAllExersize', {
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

        axios.get('http://127.0.0.1:5000/getSubscribeByEmail?email='+localStorage.getItem("email"), {
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


    }



    return(

        <>




            <div className={'row'} style={ {textAlign: 'center' ,backgroundAttachment: 'fixed' , color:'white',fontSize: '3vw', height: '10vw',margin:'0px', backgroundImage: 'url(./ocean_waves_in_blue-1920x1200.jpg)'}}>
                <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-2vw'}}>
                    Welcome {firstName?firstName:""}
                </div>
            </div>


            <Tabs defaultActiveKey="enrolled" style={{backgroundColor:'grey', }}>

                <Tab eventKey="enrolled" title="Enrolled">

                    Your Enrolled Workouts

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
                            <h4> None previously added Workouts </h4>
                        </>
                    }

                </Tab>

                <Tab eventKey="market" title="MarketPlace" align={"left"} style={{backgroundColor: 'lightgrey'}}>

                    {allExercises?<AllExercises key={rerenderAllExe} data={allExercises} callBack={subscribedCallback}/> :<></>}



                </Tab>


                <Tab eventKey="profile" title="Statistics">
                    Stats
                </Tab>
            </Tabs>





        </>
    )

}
