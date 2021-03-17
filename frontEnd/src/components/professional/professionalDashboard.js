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


            <Tabs defaultActiveKey="profile">
                <Tab eventKey="home" title="Inventory">
                    List of added workouts
                </Tab>
                <Tab eventKey="profile" title="Add New Workout" align={"left"}>
                    <AddWorkout/>
                </Tab>
                <Tab eventKey="contact" title="Statistics">
                    Stats
                </Tab>
            </Tabs>





        </>
    )

}

