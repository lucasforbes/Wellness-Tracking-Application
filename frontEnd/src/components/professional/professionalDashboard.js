import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Tab, Tabs} from "react-bootstrap";



export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");

    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))


    })


    return(

        <>

            <br/>

            <h4> Welcome {firstName?firstName:""} </h4>

            <br/>


            <Tabs defaultActiveKey="history">
                <Tab eventKey="history" title="Inventory">
                    List of added workouts
                </Tab>
                <Tab eventKey="addWorkout" title="Add New Workout" align={"left"}>
                    <AddWorkout/>
                </Tab>
                <Tab eventKey="stats" title="Statistics">
                    Stats
                </Tab>
            </Tabs>





        </>
    )

}

