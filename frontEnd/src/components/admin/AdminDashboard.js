import  React,{useState,useEffect} from 'react';
import axios from "axios";
import {act} from "@testing-library/react";
import {Button, Tab, Tabs} from "react-bootstrap";
import {FcCancel,FcCheckmark} from  "react-icons/fc";
import {Select, MenuItem, InputLabel} from "@material-ui/core";
import AddWorkout from "../professional/addWorkout";

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


    const [queries,setQueries] = useState();

    useEffect(()=>{

        axios.get('https://bloom-flask-app.herokuapp.com/fetchCustomerSupport')
            .then((res)=>{
                setQueries(res.data)
            })
            .catch((err)=>{
                console.log("Err accessing Queries",err)
            })


    },[])


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


    const updateApprovalDiet=(id,status)=>{

        let json = JSON.stringify({
            'id': id,
            'status': status
        })

        axios.post('https://bloom-flask-app.herokuapp.com/updateApprovalDiet',json)
            .then((res)=>{
                setRerender(!rerender)
                console.log(res.data)
            })
            .catch((err)=>{
                alert("Error while changing approval status")
                console.log(err)
            })
    }


    const updateApprovalNotesDiet=(id)=>{

        let notes = document.getElementById(id).value;

        let json = JSON.stringify({
            'id': id,
            'notes': notes
        })

        axios.post('https://bloom-flask-app.herokuapp.com/updateApprovalDietNote',json)
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


            <Tabs>
            <Tab eventKey="addWorkout" title="Add New Workout" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>
                <div className={"row"}>
                {queries? queries.map((item,index)=>{

                    return(

                        <div className={"card bg-primary text-white col-md-4"} style={{minHeight:'50px',borderWidth:'10px',borderColor:'white'}}>
                            Email : {item.email}
                            <br/>
                            Query : {item.message}
                        </div>

                    )

                    })

                    :"No Messages"}
                </div>
            </Tab>

            <Tab eventKey="workouts" title="Review Workouts and Diets" align={"left"} style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive'}}>
                {creatorsContent ?
                    <>

                        {Object.keys(creatorsContent).map((key,index) => {
                            return (
                                <div className={"card"} style={{paddingLeft:'10px',paddingTop:'10px',paddingRight:'10px'}}>
                                    <h5 className={"card-title"}>Creator:  {key} </h5>



                                    <div className={"card-body row"} >

                                        { creatorsContent[key].map((exercise,index2)=>{
                                            return(
                                                <>

                                                    {exercise.activityList ? <>
                                                            <div id={index2}  className={exercise.approved?"bg-success text-white col-md-5 card mb-3":"bg-danger text-white col-md-5 card mb-3"} style={{maxWidth: "50rem", minHeight:"10rem"}}>
                                                                <div className={"row"}>
                                                                    <div className={"col-md-4"}> <br/> <label>Title: </label> {exercise.title}
                                                                        <p>  {exercise.description} </p>
                                                                    </div>
                                                                    <div className={"col-md-6"}>
                                                                        <br/>
                                                                        {exercise.approved? <Button style={{width:"max-content"}} variant={"light"} onClick={()=>updateApproval(exercise._id,false)}><FcCancel/> Cancel Approval</Button>: <Button variant={"light"} style={{width:"max-content"}} onClick={()=>updateApproval(exercise._id,true)}><FcCheckmark/> Approve </Button>}
                                                                        <p>  <br/><text className={"bg-warning"}>{" Note: "} </text> </p>
                                                                        <table>
                                                                        <tr>
                                                                            <td> <input type={'text'} id={exercise._id} defaultValue={exercise.notes?exercise.notes:""} />  </td>
                                                                        </tr>
                                                                            <tr>
                                                                            <td>  <Button style={{width:"max-content"}} variant={"info"} onClick={()=>updateApprovalNotes(exercise._id)}> Update </Button> </td>
                                                                        </tr>
                                                                        </table>

                                                                    </div>
                                                                    <div className={"col-md-2"}>

                                                                    </div>
                                                                </div>

                                                                <br/>



                                                                <br/>
                                                                <div className={"row"}>
                                                                    {exercise.activityList.map((activity,index3)=>{
                                                                        return(
                                                                                <div className={ exercise.activityList.length == 1 ? " col-md-8 bg-dark" : " col-md-4 bg-dark "} >

                                                                                    <div>
                                                                                        <b> {activity.activityName}</b> <br/>
                                                                                        <p> {activity.activityDescription?activity.activityDescription:""}</p> <br/>
                                                                                        <p> Targeted Body Parts: {activity.bodyPartsTargeted+" "}
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
                                                            </div>
                                                            <div className={"col-md-1"}>
                                                            </div>
                                                        </>:

                                                        ""}

                                                    {exercise.dietList ?
                                                        <>
                                                            <div id={index2}  className={exercise.approved?"bg-success text-white col-md-5 card mb-3":"bg-danger text-white col-md-5 card mb-3"} style={{maxWidth: "50rem", minHeight:"10rem"}}>
                                                                <div className={"row"}>
                                                                    <div className={"col-md-6"}> <br/> <label>Title: </label> {exercise.title}
                                                                        <p>  {exercise.description} </p>
                                                                    </div>
                                                                    <div className={"col-md-6"}>
                                                                        <br/>
                                                                        {exercise.approved? <Button style={{width:"max-content"}} variant={"light"} onClick={()=>updateApprovalDiet(exercise._id,false)}><FcCancel/> Cancel Approval</Button>: <Button variant={"light"} style={{width:"max-content"}} onClick={()=>updateApprovalDiet(exercise._id,true)}><FcCheckmark/> Approve </Button>}
                                                                        <p>  <br/><text className={"bg-warning"}>{" Note: "} </text> </p>
                                                                        <table>
                                                                        <tr>
                                                                            <td> <input type={'text'} id={exercise._id} defaultValue={exercise.notes?exercise.notes:""} />  </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>  <Button style={{width:"max-content"}} variant={"info"} onClick={()=>updateApprovalNotesDiet(exercise._id)}> Update </Button> </td>
                                                                        </tr>
                                                                        </table>

                                                                    </div>
                                                                </div>

                                                                <br/>



                                                                <br/>
                                                                <div className={"row"}>
                                                                    {exercise.dietList.map((dietItem,index3)=>{
                                                                        return(
                                                                            <>

                                                                                <div className={ exercise.dietList.length == 1 ? "col-md-8 bg-dark" : "col-md-4 bg-dark "} style={{borderWidth:'10px',borderColor:'white'}}>
                                                                                    <b> {dietItem.item}</b> <br/>
                                                                                    <p> Serving Size: {dietItem.servingSize+" "}
                                                                                        {"Fat(kg): "+dietItem.fat+" Carbs: "+
                                                                                        dietItem.carbs+ " Calories: "+ dietItem.calories+" Protein  "+
                                                                                        dietItem.protein+" "}
                                                                                    </p>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className={"col-md-1"}>
                                                            </div>
                                                        </>:

                                                        ""}

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
            </Tab>

            </Tabs>


            {/*<h5 className={"card-header text-white bg-info"}> All Workouts and Diets </h5>*/}

            {/*<InputLabel> Filter Creator </InputLabel>*/}
            {/*<select value={} onChange={(e)=>setFilterEmail(e.target.value)}>*/}
            {/*    <option value={"All"}> All </option>*/}
            {/*    {creatorsContent ?  Object.keys(creatorsContent).map((key,index) => {  return(*/}
            {/*           <option value={key}> {key} </option>*/}
            {/*       )*/}
            {/*}):""*/}
            {/*}*/}
            {/*</select>*/}




        </>
    )
}
