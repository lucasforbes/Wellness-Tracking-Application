import React, {useState,useEffect} from "react";
import axios from "axios";


export default function Flaskapp(){

    useEffect(()=>{

        axios.get("http://127.0.0.1:5000/")
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