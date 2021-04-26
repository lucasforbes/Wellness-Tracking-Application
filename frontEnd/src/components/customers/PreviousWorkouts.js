import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import isMACAddress from "validator/es/lib/isMACAddress";
import '../../App.css';

export default function PreviousWorkouts(props){



    const images=["exe1.jpg","exe2.jpg","exe3.jpg","exe4.jpg"];

    useEffect(()=>{


    },[])

    const  removeSubscription=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/removeSubscribe",{
            id: id,
            email: localStorage.getItem('email')
        }).
        then((res)=>{
            alert("UnSubscribed Successfully")
            props.callBack()
        })
            .catch((err)=>{
                // alert("Error while unsubscribing")
                console.log(err);
            })
    }


    return(

        <>


            <div className={"row"} style={{paddingRight:'3px'}}>
            {props.data.map((exercise,index)=>{


                let image = images[index%3];

                return(
                    <>
                    <div className={"col-md-12"} style={{ minHeight: '499px'}}>
                    <div className={"bg-success text-white card mb-3 popup"}  id={index} >
                        <Card.Body style={{backgroundColor:'lightblue', borderColor: 'blue', borderStyle: 'ridge'}} >

                            <div className={"row"} style={{backgroundColor:'lightblue'}} >

                                <div className={"col-md-8"}>
                                    <h4>{exercise.title}</h4>
                                    <p style={{fontWeight: '600', fontSize: '150%', color: 'dodgerblue', textDecoration: 'underline'}}>{exercise.description}</p>
                                </div>

                                <div className={"col-md-4"}>
                                    <div>
                                        <div style={{float:'right',paddingRight:'10px',paddingTop:'10px'}}>
                                    {exercise.file ?
                                        <a href={'https://bloom-flask-app.herokuapp.com/file/'+exercise.file} target="_blank">
                                        <img  style={{width:'200px',height:'200px',borderWidth:'3px',borderStyle:'outset'}} src={'https://bloom-flask-app.herokuapp.com/file/'+exercise.file} alt={"No image"}/>
                                        </a>:
                                        <img style={{width:'200px',height:'200px'}} src={process.env.PUBLIC_URL + 'exe1.jpg'} alt={"No image"}/>}
                                        </div>
                                    </div>
                                </div>

                                {exercise.activityList.map((activity,index3)=>{
                                    return(
                                        <div className={"col-md-6"} style={{paddingLeft:'5px',paddingTop:'5px',paddingRight:'5px'}}>
                                            <div className={"card bg-warning text-white"}  id={index3} style={{color:'darkblue',fontSize:'20px',backgroundColor: 'lightblue'}}>
                                                <b> {activity.activityName}</b>
                                                <p> {activity.activityDescription?activity.activityDescription:""} </p>
                                                <p> Targeted Body Parts: {activity.bodyPartsTargeted+" "} <br/>
                                                    {"Duration: "+activity.totalDuration+" Sets: "+
                                                    activity.activitySets+ " Reps: "+ activity.activityReps+" Equipment  "+
                                                    activity.equipmentNeeded+" Video "+
                                                    activity.videoLink+" "}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>

                                    <br/>
                                    <Button onClick={()=>removeSubscription(exercise._id)} style={{minWidth: '100px'}} variant="danger" type={"button"}> Unsubscribe </Button>


                                <p></p>

                        </Card.Body>

                    </div>
                    </div>
                    <div className={"col-md-1"}>
                    </div>
                </>
                )
            })}


            </div>
        </>
    )

}
