import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import isMACAddress from "validator/es/lib/isMACAddress";
import '../../App.css';

import Rating from "react-rating";

export default function PreviousDiets(props){

    const images=["diet1.jpg","diet2.jpg","diet3.jpg"];

    useEffect(()=>{


    },[])

    const  removeDietSubscription=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/removeDietSubscribe",{
            id: id,
            email: localStorage.getItem('email')
        }).
        then((res)=>{
            alert("UnSubscribed Successfully")
            props.callBack()
        })
            .catch((err)=>{
                alert("Error while unsubscribing")
                console.log(err);
            })
    }

    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");

    function handleRatingChange(value,id) {
        setRating(value)
        // console.log("value",value,"id",id)


        axios.post("https://bloom-flask-app.herokuapp.com/addRatingsDiet",{
            id: id,
            stars : value,
        }).
        then((res)=>{
            alert("Thanks for Rating")
        })
            .catch((err)=>{
                // alert("Error while unsubscribing")
                console.log(err);
            })
            .finally(()=>{
                setRating(0)
            })

    }

    const saveComment=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/addRatingsDiet",{
            id: id,
            comment : comment,
        }).
        then((res)=>{
            alert("Thanks for your comment")
        })
            .catch((err)=>{
                // alert("Error while unsubscribing")
                console.log(err);
            })
            .finally(()=>{
                setComment("")
            })
    }



    return(

        <>


            <div className={"row"} style={{paddingRight:'3px'}}>

                {props.data.map((diet,index)=>{


                    let image = images[index%2];

                    return(
                        <>
                            <div className={"col-md-12"}  id={index}>
                                <div className={"bg-success text-white card mb-3 popup"}>

                                    <Card.Body style={{backgroundColor:'lightblue', borderColor: 'blue', borderStyle: 'ridge'}} >

                                        <div className={"row"} style={{backgroundColor:'lightblue'}} >



                                            <div className={"col-md-12"}>
                                                <div>
                                                    <div style={{float:'left'}}>
                                                        {diet.file ?
                                                            <a href={'https://bloom-flask-app.herokuapp.com/file/'+diet.file} target="_blank">
                                                                <img  style={{width:'200px',height:'200px',borderWidth:'3px',borderStyle:'outset'}} src={'https://bloom-flask-app.herokuapp.com/file/'+diet.file} alt={"No image"}/>
                                                            </a>:
                                                            <img style={{width:'200px',height:'200px'}} src={process.env.PUBLIC_URL + 'diet1.jpg'} alt={"No image"}/>}
                                                    </div>

                                                    <div style={{float:'right'}}>
                                                        <h4>{diet.title}</h4>
                                                        <p style={{fontWeight: '600', fontSize: '150%', color: 'dodgerblue', textDecoration: 'underline'}}>{diet.description}</p>

                                                        <div className={"card-header text-white bg-success"} style={{float:'right'}}>

                                                            Rate {" "}
                                                            <Rating initialRating={rating}
                                                                    onChange={(value)=>handleRatingChange(value,diet._id)}
                                                                    emptySymbol={<img style={{width:'20px',height:'20px'}}  src={process.env.PUBLIC_URL+'starempty.jpg'} className="icon" />}
                                                                    fullSymbol={<img style={{width:'20px',height:'20px'}} src={process.env.PUBLIC_URL+'starfull.jpg'} className="icon" />}/>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                                    {diet.dietList.map((dietItem,index3)=>{
                                                        return(

                                                                <div className={"col-md-6"} style={{paddingLeft:'5px',paddingTop:'5px',paddingRight:'5px'}}>
                                                                    <div className={"card bg text-white"}  id={index3} style={{border: 'none',color:'darkblue',fontSize:'20px',backgroundColor: 'lightblue'}}>
                                                                    <b> {dietItem.item}</b> <br/>
                                                                        <p> Serving Size: {dietItem.servingSize+" "} </p>
                                                                        <p>
                                                                        {"Fat(g): "+dietItem.fat+" Carbs(g): "+
                                                                        dietItem.carbs}
                                                                        <br/>
                                                                        {" Calories(g): "+ dietItem.calories+" Protein(g):  "+
                                                                        dietItem.protein+" "}
                                                                    </p>
                                                                    </div>
                                                                </div>

                                                        )
                                                    })}
                                                </div>

                                                <br/>

                                        <div style={{float:'right',color:'white'}}>

                                            <TextField  value={comment} style={{width:'400px'}} onChange={(e)=>setComment(e.target.value)} placeholder={"Add Comments"} />

                                            <Button variant={"success"} onClick={()=>saveComment(diet._id)} > Add </Button>

                                        </div>

                                                <Button onClick={()=>removeDietSubscription(diet._id)} style={{minWidth: '100px'}} variant="danger" type={"button"}> Unsubscribe </Button>

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
