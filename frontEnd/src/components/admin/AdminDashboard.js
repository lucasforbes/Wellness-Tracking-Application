import  React,{useState,useEffect} from 'react';
import axios from "axios";
import {act} from "@testing-library/react";

export default function AdminDashboard(props){


    const [creatorsContent,setCreatorsContent] = useState();

    useEffect(()=>{

        axios.get('https://bloom-flask-app.herokuapp.com/getCreatorSpecificExercises')
            .then((res)=>{
                setCreatorsContent(res.data)
            })
            .catch((err)=>{
                console.log(err)
                alert("not able to fetch Creators List")
            })


    },[])





    return(

        <>

            <h5 className={"card-header text-white bg-info"}> All Workouts </h5>

            {creatorsContent ?
                <>

                    {Object.keys(creatorsContent).map((key,index) => {
                        return (
                            <div className={"card"}>
                            <h5 className={"card-title"}>Creator:  {key} </h5>

                                <div className={"card-body row"}>

                                { creatorsContent[key].map((exercise,index2)=>{
                                return(
                                    <>
                                    <div id={index2}  className={exercise.approved?"bg-success text-white col-md-5 card mb-3":"bg-danger text-white col-md-5 card mb-3"} style={{maxWidth: "50rem", minHeight:"10rem"}}>
                                        {exercise.title}  {" "+exercise.paid}
                                        <br/>
                                       <p>  {exercise.description} </p>
                                        <br/>
                                        <div className={"row"}>
                                        {exercise.activityList.map((activity,index3)=>{
                                            return(
                                                <>
                                                <div className={"col-md-5 bg-dark"}>
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
                                    </div>
                                    <div className={"col-md-1"}>
                                    </div>
                                    </>
                                )
                            })
                            }
                            </div>
                                <div className={"col-md-12 card bg-dark"} style={{minHeight:"5px"}}>  </div>
                            </div>
                        )
                    })}


                </>

                :""

            }

        </>
    )
}
