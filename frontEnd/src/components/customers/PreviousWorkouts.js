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


            <div className={"row"}>
            {props.data.map((exercise,index)=>{


                let image = images[index%3];

                return(
                    <>
                    <div className={"col-xl-4"} style={{margin:'10px'}}>
                    <div className={"bg-success text-white card mb-3 popup"}  id={index} style={{marginLeft: '3vw'}}>
                        <Card.Body style={{backgroundColor:'lightblue', borderColor: 'blue', borderStyle: 'ridge'}} >
                            <div className={"row"} style={{backgroundColor:'lightblue'}} >

                                <div className={"col-md-4"}>
                                    <img style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + image} />
                                    <h4>{exercise.title}</h4>
                                </div>
                                <div className={"col-md-8"}>
                                    <p style={{fontWeight: '600', fontSize: '150%', color: 'dodgerblue', textDecoration: 'underline'}}>{exercise.description}</p>

                                    <div className={"row"}>
                                        {exercise.activityList.map((activity,index3)=>{
                                            return(
                                                <>
                                                    <div className={ exercise.activityList.length == 1 ? "col-md-8" : "col-md-5 "} id={index3} style={{backgroundColor: 'lightblue'}}>
                                                        <b> {activity.activityName}</b> <br/>
                                                        <p> {activity.activityDescription?activity.activityDescription:""}</p> <br/>
                                                        <p> Targeted Body Parts: {activity.bodyPartsTargeted+" "}
                                                            {"Duration: "+activity.totalDuration+" Sets: "+
                                                            activity.activitySets+ " Reps: "+ activity.activityReps+" Equipment  "+
                                                            activity.equipmentNeeded+" Video "+
                                                            activity.videoLink+" "}
                                                        </p>
                                                    </div>
                                                    <div className={"col-md-1"}>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>

                                    <br/>
                                    <Button onClick={()=>removeSubscription(exercise._id)} style={{minWidth: '100px'}} variant="danger" type={"button"}> Unsubscribe </Button>
                                </div>


                                <p></p>
                            </div>
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
