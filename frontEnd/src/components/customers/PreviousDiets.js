import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import isMACAddress from "validator/es/lib/isMACAddress";
import '../../App.css';

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



    return(

        <>


            <div className={"row"}>
                {props.data.map((diet,index)=>{


                    let image = images[index%2];

                    return(
                        <>
                            <div className={"col-md-5"} id={index}>
                                <div className={"bg-success text-white card mb-3 popup"}>
                                    <Card.Body>
                                        <div className={"row"} >

                                            <div className={"col-md-4"}>
                                                <img style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + image} />
                                                <h4>{diet.title}</h4>
                                            </div>
                                            <div className={"col-md-8"}>
                                                <p>{diet.description}</p>

                                                <div className={"row"}>
                                                    {diet.dietList.map((dietItem,index3)=>{
                                                        return(
                                                            <>
                                                                <div className={ diet.dietList.length == 1 ? "col-md-8 bg-dark" : "col-md-5 bg-dark "} id={index3}>
                                                                    <b> {dietItem.item}</b> <br/>
                                                                    <p> Serving Size: {dietItem.servingSize+" "}
                                                                        {"Fat(kg): "+dietItem.fat+" Carbs: "+
                                                                        dietItem.carbs+ " Calories: "+ dietItem.calories+" Protein  "+
                                                                        dietItem.protein+" "}
                                                                    </p>
                                                                </div>
                                                                <div className={"col-md-1"}>
                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                </div>

                                                <br/>
                                                <Button onClick={()=>removeDietSubscription(diet._id)} style={{minWidth: '100px'}} variant="danger" type={"button"}> Unsubscribe </Button>
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
