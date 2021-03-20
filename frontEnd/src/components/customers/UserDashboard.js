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

    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))

    })

    useEffect(()=>{

    axios.get('https://bloom-wellness-back.herokuapp.com/findAllExersizes', {
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



    },[])




    return(

        <>

            <br/>

            <h4> Welcome {firstName?firstName:""} </h4>

            <br/>


            <Tabs defaultActiveKey="enrolled">

                <Tab eventKey="enrolled" title="Enrolled">

                    Your Enrolled Workouts

                </Tab>

                <Tab eventKey="market" title="MarketPlace" align={"left"}>

                    {allExercises?<AllExercises data={allExercises}/> :<></>}

                </Tab>


                <Tab eventKey="profile" title="Statistics">
                    Stats
                </Tab>
            </Tabs>





        </>
    )

}
