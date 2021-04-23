import React,{useState,useEffect} from "react";
import {TextField, TextareaAutosize, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";
import {Button, Card} from "react-bootstrap";
import axios from "axios";



export default function AddDiet(props){


    const styles = theme => ({
        multilineColor:{
            color:'red'
        }
    });


    const images = [
        process.env.PUBLIC_URL + '/dietmeal1.jpg',
        process.env.PUBLIC_URL + '/dietmeal2.jpg',
        process.env.PUBLIC_URL + '/dietmeal3.jpg',
    ];

    const [imageDisplayed,setImageDisplayed] = useState(images[Math.floor(Math.random() * 3)]);



    const [dietList, setDietList] = useState([{"item": "", "servingSize": "", "fat": 0, "carbs": 0,
        "calories": 0, "protein": 0}]);

    const [dietTitle,setDietTitle]=useState("");
    const [dietDescription,setDietDescription]= useState("");
    const [paid,setPaid] = useState(false);



    const [dietImage,setDietImage] = useState();

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

        formData.append("diet",json);

        if(dietImage){
            formData.append("file",dietImage);
        }


        axios.post('https://bloom-flask-app.herokuapp.com/addDiet', formData, {
            headers: {
                // 'Content-type': 'multipart/form-data',

                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("status",response);
            props.addedNewDiet()

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
        <div className={"row"}>

            <div className={"col-md-6"}>

            <Card
                bg={'Light'.toLowerCase()}
                text={''}
                style={{ backgroundColor: 'lightgreen',width: '88%', marginRight: 'auto', marginLeft: 'auto', fontFamily: 'Cursive'}}

            >

                <form >


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

                            <input
                                type="file"
                                onChange={(e) => setDietImage(e.target.files[0])}
                            />


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

            {dietImage?
                <div className={"col-md-4"} style={{paddingTop:'100px',paddingLeft:'100px',paddingRight:'100px'}}>
                    <div style={{float:"left"}} >
                        <img style={{maxWidth:'400px',maxHeight:'500px'}} src={URL.createObjectURL(dietImage)} alt={"Not able to disaply Image"}/>


                        <div className={"card-header bg-primary text-white"} style={{paddingTop:'20px'}}> Image Selected </div>
                    </div>

                </div>

                :

                <div className={"col-md-4"} style={{paddingTop:'100px',paddingLeft:'100px',paddingRight:'100px'}}>
                    <div style={{float:"left"}} onClick={()=>setImageDisplayed(images[Math.floor(Math.random() * 3)])}>
                        <img style={{width:'400px',height:'400px'}} src={imageDisplayed}/>
                    </div>
                </div>

            }


        </div>
    );
}
