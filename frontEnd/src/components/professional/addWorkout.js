import React,{useState,useEffect} from "react";
import {TextField, TextareaAutosize, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";
import {Button, Card} from "react-bootstrap";
import axios from "axios";
import {loginAction} from "../../actions/login";


export default function AddWorkout(){



    const [activityList, setActivityList] = useState([{ ActivityName: "", ActivityDescription: "" , BodyPartsTargeted:"", Duration:"",
        ActivitySets:"", ActibityReps:"", EquipmentNeeded:""}]);

    const [workoutTitle,setWorkoutTitle]=useState("");
    const [workoutDescription,setWorkoutDescription]= useState("");
    const [paid,setPaid] = useState(false);

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
        setActivityList([...activityList, { ActivityName: "", ActivityDescription: "" , BodyPartsTargeted:"", Duration:"", ActivitySets:"", ActibityReps:"", EquipmentNeeded:""}]);
    };


    const [json,setJson] = useState("");

    const workoutSubmit=(e)=>{

        e.preventDefault()

        const json = JSON.stringify({
            'email': localStorage.getItem("email"),
            'activityList': activityList,
            'Title': workoutTitle,
            'Descriptiom': workoutDescription,
            'Paid': paid
        });


        axios.post('https://bloom-wellness-back.herokuapp.com/addExersize', json, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("status",response);

        })
            .catch(function (error) {
                console.log(error);
            })

        setJson(json);

    }

    return (
        <div>

            <Card
                bg={'Light'.toLowerCase()}
                text={''}
                style={{ width: '100%' }}

            >

            <form onSubmit={workoutSubmit}>

                <div className={"row"} style={{paddingLeft:"10px",paddingTop:"10px"}}>


                    <div className={"col-md-12"}>

                    <TextField
                        required
                        style={{background:'black !important'}}
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

                                          value={workoutDescription}
                                          onChange={(e)=>setWorkoutDescription(e.target.value)}/>


                    </div>



                    <div className={"col-md-12"}>

                       <h4>  Add activity </h4>

                    </div>


                    <div className={"col-md-12"}>

                        {activityList.map((activity, i) => {
                            return (

                                <>
                                    <div className={"col-md-12"}>


                                        <TextField
                                            required
                                            name={"ActivityName"}
                                            style={{background:'black !important'}}
                                            label="Activity Name"
                                            id={"workoutName"}
                                            value={activity.ActivityName}
                                            onChange={e=>handleInputChange(e,i)}
                                        />
                                        <br/>
                                        <br/>


                                    </div>

                                     <div>

                                         <TextareaAutosize  rowsMin={3} cols={"50"} placeholder="Activity Description"
                                            value={activity.ActivityDescription} name={"ActivityDescription"}
                                            onChange={e=>handleInputChange(e,i)}
                                         />

                                     </div>

                                    <div className={"col-md-12"}>


                                        <FormControl>
                                            <InputLabel> Body Parts Targeted </InputLabel>
                                            <Select
                                                name={"BodyPartsTargeted"}
                                                value={activity.BodyPartsTargeted}
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
                                             required
                                             InputProps={{
                                                 inputProps: {
                                                     min: 1
                                                 }
                                             }}
                                             type={"number"}
                                             name={"Duration"}
                                             style={{background:'black !important'}}
                                             label="Duration in minutes"
                                             value={activity.Duration}
                                             onChange={e=>handleInputChange(e,i)}
                                         />


                                 </div>

                                 <div className={"col-md-12"}>

                                     <TextField
                                         required
                                         InputProps={{
                                             inputProps: {
                                                 min: 1
                                             }
                                         }}
                                         type={"number"}
                                         name={"ActibityReps"}
                                         style={{background:'black !important'}}
                                         label="Reps"
                                         value={activity.ActibityReps}
                                         onChange={e=>handleInputChange(e,i)}
                                     />

                                     <TextField
                                         required
                                         InputProps={{
                                             inputProps: {
                                                 min: 1
                                             }
                                         }}
                                         type={"number"}
                                         name={"ActivitySets"}
                                         style={{background:'black !important'}}
                                         label="Sets"
                                         value={activity.ActivitySets}
                                         onChange={e=>handleInputChange(e,i)}
                                     />


                                 </div>

                                    <div className={"col-md-12"}>

                                        <TextField
                                            name={"EquipmentNeeded"}
                                            style={{background:'black !important',width: '100 px !important'}}
                                            label="Equipment Needed"

                                            value={activity.EquipmentNeeded}
                                            onChange={e=>handleInputChange(e,i)}
                                        />

                                    </div>


                                <div>
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

                        <Button variant="success" onClick={workoutSubmit}>Submit </Button>{' '}

                    </div>

                    <div style={{ marginTop: 20 }}>{JSON.stringify(json)}</div>




                </div>

            </form>
            </Card>


        </div>
    );
}
