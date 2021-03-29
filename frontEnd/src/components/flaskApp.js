import React, {useState,useEffect} from "react";
import axios from "axios";


export default function Flaskapp(){

    useEffect(()=>{

        axios.get("https://bloom-flask-app.herokuapp.com/")
            .then((res)=>{
                console.log("Flask",res.data)
            }).catch((err)=>{
                console.log(err);
        })


    },[])

    return(
        <>
            Add Page
        </>
    )
}