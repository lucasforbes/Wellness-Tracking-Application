import React,{useState,useEffect} from "react";
import AddWorkout from "./addWorkout";
import {Row, Card, Col, Container, Tab, Tabs} from "react-bootstrap";
import axios from "axios";

export default function ProfessionalDashboard(props){

    const { children, value, index, ...other } = props;

    const [firstName,setFirstName] = useState("");
    const [professionalEmail,setProfessionalEmail] = useState("");

    const [previouslyAddedWorkouts,setPreviouslyAddedWorkouts] = useState();


    useEffect(()=>{

        setFirstName(localStorage.getItem("userFirstName"))
        setProfessionalEmail(localStorage.getItem("email"))

        axios.get("https://bloom-wellness-back.herokuapp.com/findExersizeByCreatorEmail/"+localStorage.getItem("email")).
            then((res)=>{
                setPreviouslyAddedWorkouts(res.data)
        }).catch((err)=>{
            console.log(err);
        })


    },[])


    return(

        <>

            <div className={'row'} style={ {textAlign: 'center' ,backgroundAttachment: 'fixed' , color:'white',fontSize: '3vw', height: '10vw',margin:'0px', backgroundImage: 'url(./ocean_waves_in_blue-1920x1200.jpg)'}}>
                <div className={'col-xs-4'} style={{position:"relative",right: '-10vw', bottom: '-2vw'}}>
                    Welcome {firstName?firstName:""}
                </div>
            </div>



            <Tabs defaultActiveKey="history" style={{backgroundColor: 'lightgrey'}}>

                <Tab eventKey="history" title="Inventory" style = {{backgroundColor: ''}}>

                    <header style={{textAlign: 'center'}}> Workouts</header>

                    {previouslyAddedWorkouts && previouslyAddedWorkouts.length > 0 ?previouslyAddedWorkouts.map((workouts,index)=>{return(
                            <>
                                {JSON.stringify(workouts)}
                            </>
                        )
                    }):
                    <>
                    <h4> None previously added Workouts </h4>
                    </>
                    }





                </Tab>

                <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'grey'}}>
                    <AddWorkout/>
                </Tab>


                <Tab eventKey="stats" title="Statistics" style={{backgroundColor: 'lightgrey'}}>
                    Stats
                </Tab>

            </Tabs>





        </>
    )

}

