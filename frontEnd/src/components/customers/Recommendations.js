import React,{useState,useEffect} from "react";
import axios from "axios";

import {alpha} from "validator/es/lib/alpha";

export default function Recommnedations(){




    useEffect(()=>{

            axios.get('https://bloom-wellness-back.herokuapp.com/statistic/priority?email='+localStorage.getItem('email'),{
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((res)=>{
                axios.get('https://bloom-flask-app.herokuapp.com/recommendations?email='+localStorage.getItem('email') +
                    '&first='+res.data['first']+'&second='+res.data['second'],{
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((res2)=>{
                    console.log("re videos",res2.data)
                }).catch((err2)=>{
                    console.log("Error fetching recommendations")
                })


            })
            .catch((err)=>{
                alert("Error while fetching priority")
                console.log(err)
            })

    },[])


    return(
        <>
            Re
        </>
    )
}