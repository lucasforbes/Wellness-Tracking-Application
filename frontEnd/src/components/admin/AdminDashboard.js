import  React,{useState,useEffect} from 'react';
import axios from "axios";
import {act} from "@testing-library/react";
import {Button} from "react-bootstrap";
import {FcCancel,FcCheckmark} from  "react-icons/fc";
import {Select, MenuItem, InputLabel} from "@material-ui/core";

export default function AdminDashboard(props){


    const [rerender,setRerender] = useState(false);

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


    },[rerender])


    // const [filterEmail,setFilterEmail] = useState();

    // let newFilter = null;
    // if(creatorsContent){
    //     newFilter   = JSON.parse(JSON.stringify(creatorsContent));
    //     // if(filterEmail && filterEmail!="All"){
    //     //    newFilter = null
    //     //     newFilter={'email':creatorsContent['filterEmail']}
    //     // }
    // }


    const updateApproval=(id,status)=>{

        let json = JSON.stringify({
          'id': id,
          'status': status
        })

        axios.post('https://bloom-flask-app.herokuapp.com/updateApprovalExercise',json)
            .then((res)=>{
                setRerender(!rerender)
                console.log(res.data)
            })
            .catch((err)=>{
                alert("Error while changing approval status")
                console.log(err)
            })
    }


    const updateApprovalNotes=(id)=>{

        let notes = document.getElementById(id).value;

        let json = JSON.stringify({
            'id': id,
            'notes': notes
        })

        axios.post('https://bloom-flask-app.herokuapp.com/updateApprovalExerciseNote',json)
            .then((res)=>{
                setRerender(!rerender)
                console.log(res.data)
            })
            .catch((err)=>{
                alert("Error while changing approval notes")
                console.log(err)
            })
    }



    return(

        <>

            <h5 className={"card-header text-white bg-info"}> All Workouts </h5>

            {/*<InputLabel> Filter Creator </InputLabel>*/}
            {/*<select value={} onChange={(e)=>setFilterEmail(e.target.value)}>*/}
            {/*    <option value={"All"}> All </option>*/}
            {/*    {creatorsContent ?  Object.keys(creatorsContent).map((key,index) => {  return(*/}
            {/*           <option value={key}> {key} </option>*/}
            {/*       )*/}
            {/*}):""*/}
            {/*}*/}
            {/*</select>*/}


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
                                        <div className={"row"}>
                                            <div className={"col-md-6"}> <br/> <label>Title: </label> {exercise.title}
                                            <p>  {exercise.description} </p>
                                            </div>
                                            <div className={"col-md-6"}>
                                            <br/>
                                                {exercise.approved? <Button style={{width:"max-content"}} variant={"light"} onClick={()=>updateApproval(exercise._id,false)}><FcCancel/> Cancel Approval</Button>: <Button variant={"light"} style={{width:"max-content"}} onClick={()=>updateApproval(exercise._id,true)}><FcCheckmark/> Approve </Button>}
                                               <p>  <br/><text className={"bg-warning"}>{" Note: "} </text> </p>
                                                <tr>
                                                    <td> <input type={'text'} id={exercise._id} defaultValue={exercise.notes?exercise.notes:""} />  </td>
                                                    <td> {" "}</td>
                                                    <td>  <Button style={{width:"max-content"}} variant={"info"} onClick={()=>updateApprovalNotes(exercise._id)}> Update </Button> </td>
                                                </tr>

                                            </div>
                                        </div>

                                        <br/>



                                        <br/>
                                        <div className={"row"}>
                                        {exercise.activityList.map((activity,index3)=>{
                                            return(
                                                <>
                                                <div className={ exercise.activityList.length == 1 ? "col-md-8 bg-dark" : "col-md-5 bg-dark "}>
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
