import React,{useState,useEffect} from "react";
import {TextField, TextareaAutosize, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";
import {Button, Card} from "react-bootstrap";
import axios from "axios";



export default function AddWorkout(props){


    const styles = theme => ({
        multilineColor:{
            color:'red'
        }
    });


    const [activityList, setActivityList] = useState([{ activityName: "", activityDescription: "" , bodyPartsTargeted:"", totalDuration:1,
        activitySets:1, activityReps:1, equipmentNeeded:"", videoLink:""}]);

    const [workoutTitle,setWorkoutTitle]=useState("");
    const [workoutDescription,setWorkoutDescription]= useState("");
    const [paid,setPaid] = useState(false);


    //Image upload
    const [workoutImage,setWorkoutImage] = useState();
    const fileChangedHandler = event => {
        setWorkoutImage(event.target.files[0])
    }



    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...activityList];
        list[index][name] = value;
        setActivityList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...activityList];
        list.splice(index, 1);
        setActivityList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setActivityList([...activityList, { activityName: "", activityDescription: "" , bodyPartsTargeted:"", totalDuration:1,
            activitySets:1, activityReps:1, equipmentNeeded:"", videoLink:""}]);
    };



    // const [json,setJson] = useState("");

    const validateParamteres=()=>{

        let flag = true;

        if (workoutTitle != "" && workoutTitle.length >= 1) {
        }else{
            flag = false;
            alert("Add Workout Title");
            return flag;
        }

        if (workoutDescription != "" && workoutDescription.length >= 1) {

        }else{
            flag = false;
            alert("Add Workout Description");
            return flag;
        }

        // if (workoutImage != "" && workoutImage!= undefined) {
        //
        // }else{
        //     flag = false;
        //     alert("Add a Workout Image");
        //     return flag;
        // }

        return flag;
    }

    const workoutSubmit=()=>{

        let formData = new FormData();

        let json = JSON.stringify({
            'email': localStorage.getItem("email"),
            'activityList': activityList,
            'title': workoutTitle,
            'description': workoutDescription,
            'paid': paid
        });

        // formData.append("photo",workoutImage);
        // formData.append("exersize",json);


        // axios.post('https://bloom-wellness-back.herokuapp.com/addExersize', formData, {
        //     headers: {
        //         'Content-type': 'multipart/form-data',
        //
        //         // 'Content-type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }).then(function (response) {
        //     // handle success
        //     console.log("status",response);
        //     // json = null;
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })

        axios.post('https://bloom-flask-app.herokuapp.com/addExersize', json, {
            headers: {
                // 'Content-type': 'multipart/form-data',

                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("status",response);
            props.addedNewWorkout()
            // json = null;
        })
            .catch(function (error) {
                console.log(error);
            })


        alert("Workout add request made");

        setWorkoutImage(null);
        setActivityList([{ activityName: "", activityDescription: "" , bodyPartsTargeted:"", totalDuration:1,
            activitySets:1, activityReps:1, equipmentNeeded:1, videoLink:1}])
        setWorkoutDescription("")
        setWorkoutTitle("");

        // setJson(json);

    }


    return (
        <div>

            <Card
                bg={'Light'.toLowerCase()}
                text={''}
                style={{ backgroundColor: 'lightgreen',width: '88%', marginRight: 'auto', marginLeft: 'auto', fontFamily: 'Cursive'}}

            >

            <form >


                <div className={"row"} style={{color: 'white' ,backgroundColor: 'lightgreen',paddingLeft:"10px",paddingTop:"10px"}} >

                    <div className={"col-md-12"}  >

                        <h4 style={{fontSize: '180%', textDecoration: 'underline' }}>  New Workout </h4>

                    </div>



                    <div className={"col-md-12"} >

                        <TextField
                            required
                            style={{backgroundColor:'blue !important' }}
                            label="Workout Name"
                            id={"workoutName"}
                            value={workoutTitle}
                            onChange={(e)=>setWorkoutTitle(e.target.value)}/>

                        {"          "}


                        <FormControl>
                            <InputLabel>Paid</InputLabel>
                            <Select
                                value={paid}
                                onChange={(e)=>setPaid(e.target.value)}
                                style={{width:'100px'}}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>

                            </Select>
                        </FormControl>



                        <br/>
                        <br/>


                    </div>


                    <div className={"col-md-12"}>


                        <TextareaAutosize  rowsMin={4} cols={"80"} placeholder="Workout Description"
                                           required
                                           value={workoutDescription}
                                           style={{color: 'dodgerblue', width:'30vw', minHeight:'40px'}}
                                           onChange={(e)=>setWorkoutDescription(e.target.value)}/>


                    </div>



                    <div className={"col-md-12"}  >

                        <h4 style={{fontSize: '180%', textDecoration: 'underline' }}>  Add activity </h4>

                    </div>


                    <div className={"col-md-12"}>

                        {activityList.map((activity, i) => {
                            return (

                                <>
                                    <div className={"col-md-12"}>


                                        <TextField

                                            name={"activityName"}
                                            style={{background:'black !important'}}
                                            label="Activity Name"

                                            value={activity.ActivityName}
                                            onChange={e=>handleInputChange(e,i)}
                                        />
                                        <br/>
                                        <br/>


                                    </div>

                                    <div>

                                        <TextareaAutosize  rowsMin={3} cols={"50"} placeholder="Activity Description"
                                                           style={{color: 'dodgerblue' , width:'30vw', minHeight:'40px'}}
                                                           value={activity.activityDescription} name={"activityDescription"}
                                                           onChange={e=>handleInputChange(e,i)}
                                        />

                                    </div>

                                    <div className={"col-md-12"}>


                                        <FormControl>
                                            <InputLabel> Body Parts Targeted </InputLabel>
                                            <Select
                                                name={"bodyPartsTargeted"}
                                                value={activity.bodyPartsTargeted}
                                                onChange={e=>handleInputChange(e,i)}
                                                style={{width:'200px'}}
                                            >
                                                <MenuItem value={"legs"}>Legs</MenuItem>
                                                <MenuItem value={"hands"}>Hands</MenuItem>
                                                <MenuItem value={"chest"}> Chest </MenuItem>
                                                <MenuItem value={"other"}> Other </MenuItem>
                                                <MenuItem value={"other"}> All </MenuItem>

                                            </Select>
                                        </FormControl>

                                        {"  "}

                                        <TextField

                                            InputProps={{
                                                inputProps: {
                                                    min: 1
                                                }
                                            }}
                                            type={"number"}
                                            name={"totalDuration"}
                                            style={{background:'black !important'}}
                                            label="Duration in minutes"
                                            value={activity.totalDuration}
                                            onChange={e=>handleInputChange(e,i)}
                                        />


                                    </div>

                                    <div className={"col-md-12"}>

                                        <TextField

                                            InputProps={{
                                                inputProps: {
                                                    min: 1
                                                }
                                            }}
                                            type={"number"}
                                            name={"activityReps"}
                                            style={{background:'black !important'}}
                                            label="Reps"
                                            value={activity.activityReps}
                                            onChange={e=>handleInputChange(e,i)}
                                        />

                                        <TextField

                                            InputProps={{
                                                inputProps: {
                                                    min: 1
                                                }
                                            }}
                                            type={"number"}
                                            name={"activitySets"}
                                            style={{background:'black !important'}}
                                            label="Sets"
                                            value={activity.activitySets}
                                            onChange={e=>handleInputChange(e,i)}
                                        />


                                    </div>

                                    <div className={"col-md-12"}>

                                        <TextField
                                            name={"equipmentNeeded"}
                                            style={{background:'black !important',width: '100 px !important'}}
                                            label="Equipment Needed"

                                            value={activity.equipmentNeeded}
                                            onChange={e=>handleInputChange(e,i)}
                                        />

                                        <TextField
                                            name={"videoLink"}
                                            style={{background:'black !important',width: '100 px !important'}}
                                            label="Video Link"

                                            value={activity.videoLink}
                                            onChange={e=>handleInputChange(e,i)}
                                        />




                                    </div>


                                    <div className={"row"}>
                                        <div className="btn-box">
                                            <br/>
                                            <br/>
                                            {activityList.length !== 1 && <Button
                                                variant="danger"
                                                onClick={() => handleRemoveClick(i)}>Remove</Button>} {" "} {" "}
                                            {activityList.length - 1 === i && <Button variant={"primary"} onClick={handleAddClick}>Add</Button>}
                                        </div>

                                    </div>


                                </>

                            );

                        })}



                    </div>



                    <div className={"col-md-12"}>


                        <Button style={{height: '40px',position: 'relative', right: '-400px', top: '-37px'}} variant="success" onClick={()=>{

                            if(validateParamteres()){
                                workoutSubmit()
                            }
                        }}>Submit </Button>{' '}


                    </div>






                </div>


            </form>
            </Card>


        </div>
    );
}
