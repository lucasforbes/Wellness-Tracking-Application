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


    const [dietList, setDietList] = useState([{"item": "", "servingSize": "", "fat": 0, "carbs": 0,
        "calories": 0, "protein": 0}]);

    const [dietTitle,setDietTitle]=useState("");
    const [dietDescription,setDietDescription]= useState("");
    const [paid,setPaid] = useState(false);


    // //Image upload
    // const [workoutImage,setWorkoutImage] = useState();
    // const fileChangedHandler = event => {
    //     setWorkoutImage(event.target.files[0])
    // }



    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...dietList];
        list[index][name] = value;
        setDietList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...dietList];
        list.splice(index, 1);
        setDietList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setDietList([...dietList, {"item": "", "servingSize": "", "fat": 0, "carbs": 0,
            "calories": 0, "protein": 0}]);
    };



    // const [json,setJson] = useState("");

    const validateParamteres=()=>{

        let flag = true;

        if (dietTitle != "" && dietTitle.length >= 1) {
        }else{
            flag = false;
            alert("Add Diet Title");
            return flag;
        }

        if (dietDescription != "" && dietDescription.length >= 1) {

        }else{
            flag = false;
            alert("Add Diet Description");
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

    const dietSubmit=()=>{

        let formData = new FormData();

        let json = JSON.stringify({
            'email': localStorage.getItem("email"),
            'dietList': dietList,
            'title': dietTitle,
            'description': dietDescription,
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

        axios.post('https://bloom-flask-app.herokuapp.com/addDiet', json, {
            headers: {
                // 'Content-type': 'multipart/form-data',

                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("status",response);
            // props.addedNewWorkout()
            // json = null;
        })
            .catch(function (error) {
                console.log(error);
            })


        alert("Diet add request made");


        // setWorkoutImage(null);

        setDietList([{"item": "", "servingSize": "", "fat": 0, "carbs": 0,
            "calories": 0, "protein": 0}]);
        setDietDescription("")
        setDietTitle("");

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

                    {/*<div className={"row"} style={{paddingLeft:"10px",paddingTop:"10px" , backgroundColor: 'lightgreen', fontFamily: 'Cursive' }}>*/}

                    {/*    <div className={"col-md-12"}>*/}

                    {/*        <h4 style={{color: 'white', marginTop: '20px', fontWeight: '900', textDecoration: 'underline'}}>  New Workout </h4>*/}

                    {/*    </div>*/}


                    {/*    <div className={"col-md-12"}>*/}

                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        style={{color: 'dodgerblue'}}*/}

                    {/*        label="Workout Name"*/}
                    {/*        id={"workoutName"}*/}
                    {/*        value={workoutTitle}*/}
                    {/*        onChange={(e)=>setWorkoutTitle(e.target.value)}/>*/}

                    {/*        {"          "}*/}


                    {/*        <FormControl >*/}
                    {/*            <InputLabel>Paid</InputLabel>*/}
                    {/*            <Select*/}
                    {/*                value={paid}*/}
                    {/*                onChange={(e)=>setPaid(e.target.value)}*/}
                    {/*                style={{width:'100px'}}*/}
                    {/*            >*/}
                    {/*                <MenuItem value={true}>Yes</MenuItem>*/}
                    {/*                <MenuItem value={false}>No</MenuItem>*/}

                    {/*            </Select>*/}
                    {/*        </FormControl>*/}

                    {/*        /!*<div className={"col-md-3"}>*!/*/}
                    {/*        /!*    <br/>*!/*/}
                    {/*        /!*    <input type="file"  required onChange={fileChangedHandler}/>*!/*/}
                    {/*        /!*</div>*!/*/}

                    {/*        <br/>*/}
                    {/*        <br/>*/}


                    {/*    </div>*/}


                    {/*    <div className={"col-md-12"}>*/}


                    {/*        <TextareaAutosize  style={{backgroundColor: 'white', color: 'dodgerblue'}} rowsMin={4} cols={"80"} placeholder="Workout Description"*/}

                    {/*                          value={workoutDescription}*/}
                    {/*                          onChange={(e)=>setWorkoutDescription(e.target.value)}/>*/}


                    {/*    </div>*/}



                    {/*    <div className={"col-md-12"}>*/}

                    {/*       <h4 style={{color: 'White', marginTop: '20px', fontWeight: '900', textDecoration: 'underline'}}>  Add activity </h4>*/}

                    {/*    </div>*/}


                    {/*    <div className={"col-md-12"}>*/}

                    {/*        {activityList.map((activity, i) => {*/}
                    {/*            return (*/}

                    {/*                <>*/}
                    {/*                    <div className={"col-md-12"} style={{backgroundColor: 'lightgreen'}}>*/}


                    {/*                        <TextField*/}
                    {/*                            required*/}
                    {/*                            name={"activityName"}*/}
                    {/*                            style={{background:'black !important'}}*/}
                    {/*                            label="Activity Name"*/}

                    {/*                            value={activity.ActivityName}*/}
                    {/*                            onChange={e=>handleInputChange(e,i)}*/}
                    {/*                        />*/}
                    {/*                        <br/>*/}
                    {/*                        <br/>*/}


                    {/*                    </div>*/}

                    {/*                     <div>*/}

                    {/*                         <TextareaAutosize style={{color: 'dodgerblue'}} rowsMin={3} cols={"50"} placeholder="Activity Description"*/}
                    {/*                            value={activity.activityDescription} name={"activityDescription"}*/}
                    {/*                            onChange={e=>handleInputChange(e,i)}*/}
                    {/*                         />*/}

                    {/*                     </div>*/}

                    {/*                    <div className={"col-md-12"} style={{backgroundColor: 'lightgreen'}}>*/}


                    {/*                        <FormControl>*/}
                    {/*                            <InputLabel> Body Parts Targeted </InputLabel>*/}
                    {/*                            <Select*/}
                    {/*                                name={"bodyPartsTargeted"}*/}
                    {/*                                value={activity.bodyPartsTargeted}*/}
                    {/*                                onChange={e=>handleInputChange(e,i)}*/}
                    {/*                                style={{width:'200px'}}*/}
                    {/*                            >*/}
                    {/*                                <MenuItem value={"legs"}>Legs</MenuItem>*/}
                    {/*                                <MenuItem value={"hands"}>Hands</MenuItem>*/}
                    {/*                                <MenuItem value={"chest"}> Chest </MenuItem>*/}
                    {/*                                <MenuItem value={"other"}> Other </MenuItem>*/}
                    {/*                                <MenuItem value={"other"}> All </MenuItem>*/}

                    {/*                            </Select>*/}
                    {/*                        </FormControl>*/}

                    {/*                        {"  "}*/}

                    {/*                         <TextField*/}
                    {/*                             required*/}
                    {/*                             InputProps={{*/}
                    {/*                                 inputProps: {*/}
                    {/*                                     min: 1,*/}

                    {/*                                                                                    }*/}
                    {/*                             }}*/}
                    {/*                             type={"number"}*/}
                    {/*                             name={"totalDuration"}*/}
                    {/*                             style={{background:'black !important'}}*/}
                    {/*                             label="Duration in minutes"*/}
                    {/*                             value={activity.totalDuration}*/}
                    {/*                             onChange={e=>handleInputChange(e,i)}*/}
                    {/*                         />*/}


                    {/*                 </div>*/}

                    {/*                 <div className={"col-md-12"}>*/}

                    {/*                     <TextField*/}
                    {/*                         required*/}
                    {/*                         InputProps={{*/}
                    {/*                             inputProps: {*/}
                    {/*                                 min: 1*/}
                    {/*                             }*/}
                    {/*                         }}*/}
                    {/*                         type={"number"}*/}
                    {/*                         name={"activityReps"}*/}
                    {/*                         style={{background:'black !important'}}*/}
                    {/*                         label="Reps"*/}
                    {/*                         value={activity.activityReps}*/}
                    {/*                         onChange={e=>handleInputChange(e,i)}*/}
                    {/*                     />*/}

                    {/*                     <TextField*/}
                    {/*                         required*/}
                    {/*                         InputProps={{*/}
                    {/*                             inputProps: {*/}
                    {/*                                 min: 1*/}
                    {/*                             }*/}
                    {/*                         }}*/}
                    {/*                         type={"number"}*/}
                    {/*                         name={"activitySets"}*/}
                    {/*                         style={{background:'black !important'}}*/}
                    {/*                         label="Sets"*/}
                    {/*                         value={activity.activitySets}*/}
                    {/*                         onChange={e=>handleInputChange(e,i)}*/}
                    {/*                     />*/}


                    {/*                 </div>*/}

                    {/*                    <div className={"col-md-12"}>*/}

                    {/*                        <TextField*/}
                    {/*                            name={"equipmentNeeded"}*/}
                    {/*                            style={{background:'black !important',width: '100 px !important'}}*/}
                    {/*                            label="Equipment Needed"*/}

                    {/*                            value={activity.equipmentNeeded}*/}
                    {/*                            onChange={e=>handleInputChange(e,i)}*/}
                    {/*                        />*/}

                    {/*                        <TextField*/}
                    {/*                            name={"videoLink"}*/}
                    {/*                            style={{background:'black !important',width: '100 px !important'}}*/}
                    {/*                            label="Video Link"*/}

                    {/*                            value={activity.videoLink}*/}
                    {/*                            onChange={e=>handleInputChange(e,i)}*/}
                    {/*                        />*/}




                    {/*                    </div>*/}


                    {/*                <div>*/}
                    {/*                    <div className="btn-box">*/}
                    {/*                        <br/>*/}
                    {/*                        <br/>*/}
                    {/*                        {activityList.length !== 1 && <Button*/}
                    {/*                            variant="danger"*/}
                    {/*                            onClick={() => handleRemoveClick(i)}>Remove</Button>} {" "} {" "}*/}
                    {/*                        {activityList.length - 1 === i && <Button variant={"primary"} onClick={handleAddClick}>Add</Button>}*/}
                    {/*                    </div>*/}




                    {/*                 </div>*/}


                    {/*                </>*/}

                    {/*            );*/}
                    {/*        })}*/}

                    {/*    </div>*/}

                    {/*    <div className={'col-md-3'} style={{position:'relative', bottom: '38px', right: '-400px'}}>*/}
                    {/*        <Button variant="success" onClick={workoutSubmit}>Submit </Button>{' '}*/}
                    {/*    </div>*/}








                    {/*</div>*/}

                    <div className={"row"} style={{color: 'white' ,backgroundColor: 'lightgreen',paddingLeft:"10px",paddingTop:"10px"}} >
                        <div className={"col-md-12"}  >

                            <h4 style={{fontSize: '180%', textDecoration: 'underline' }}>  Add Diet </h4>

                        </div>


                        <div className={"col-md-12"}>

                            <TextField
                                required
                                style={{background:'black !important'}}
                                label="Diet Plan Name"
                                id={"workoutName"}
                                value={dietTitle}
                                onChange={(e)=>setDietTitle(e.target.value)}/>

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

                            {/*<div className={"col-md-3"}>*/}
                            {/*    <br/>*/}
                            {/*    <input type="file"  required onChange={fileChangedHandler}/>*/}
                            {/*</div>*/}

                            <br/>
                            <br/>


                        </div>


                        <div className={"col-md-12"}>


                            <TextareaAutosize  rowsMin={4} cols={"80"} placeholder="Diet Description"
                                               required
                                               style={{color: 'dodgerblue' , width:'30vw', minHeight:'30px'}}
                                               value={dietDescription}
                                               onChange={(e)=>setDietDescription(e.target.value)}/>


                        </div>



                        <div className={"col-md-12"}  >

                            <h4 style={{fontSize: '180%', textDecoration: 'underline' }}>  Add Item </h4>

                        </div>

                        <div className={"col-md-12"}>

                            {dietList.map((diet, i) => {
                                return (

                                    <>
                                        <div className={"col-md-12"}>


                                            <TextField

                                                name={"item"}
                                                style={{background:'black !important'}}
                                                label="Food Item"

                                                value={diet.item}
                                                onChange={e=>handleInputChange(e,i)}
                                            />

                                            {" "}


                                            <TextField

                                                name={"servingSize"}
                                                style={{background:'black !important'}}
                                                label="Serving Size"
                                                value={diet.servingSize}
                                                onChange={e=>handleInputChange(e,i)}
                                            />



                                        </div>



                                        <div className={"col-md-12"}>


                                            {"  "}

                                            <TextField

                                                InputProps={{
                                                    inputProps: {
                                                        min: 1
                                                    }
                                                }}
                                                type={"number"}
                                                name={"fat"}
                                                style={{background:'black !important'}}
                                                label="Fats in kg"
                                                value={diet.fat}
                                                onChange={e=>handleInputChange(e,i)}
                                            />

                                            {" "}

                                            <TextField

                                                InputProps={{
                                                    inputProps: {
                                                        min: 1
                                                    }
                                                }}
                                                type={"number"}
                                                name={"carbs"}
                                                style={{background:'black !important'}}
                                                label="Carbs in kg"
                                                value={diet.carbs}
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
                                                name={"calories"}
                                                style={{background:'black !important'}}
                                                label="Calories"
                                                value={diet.calories}
                                                onChange={e=>handleInputChange(e,i)}
                                            />

                                            {" "}

                                            <TextField

                                                InputProps={{
                                                    inputProps: {
                                                        min: 1
                                                    }
                                                }}
                                                type={"number"}
                                                name={"protein"}
                                                style={{background:'black !important'}}
                                                label="Carbs in kg"
                                                value={diet.protein}
                                                onChange={e=>handleInputChange(e,i)}
                                            />


                                        </div>




                                        <div>
                                            <div className="btn-box">
                                                <br/>
                                                <br/>
                                                {dietList.length !== 1 && <Button
                                                    variant="danger"
                                                    onClick={() => handleRemoveClick(i)}>Remove</Button>} {" "} {" "}
                                                {dietList.length - 1 === i && <Button variant={"primary"} onClick={handleAddClick}>Add</Button>}
                                            </div>
                                        </div>

                                    </>

                                );
                            })}

                        </div>


                        <div className={"col-md-12"}>

                            <Button style={{height: '40px',position: 'relative', right: '-400px', top: '-37px'}} variant="success" onClick={()=>{

                                if(validateParamteres()){
                                    dietSubmit()
                                }
                            }}>Submit </Button>{' '}

                        </div>





                    </div>


                </form>
            </Card>


        </div>
    );
}
