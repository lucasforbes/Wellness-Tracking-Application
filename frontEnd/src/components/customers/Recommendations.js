import React,{useState,useEffect} from "react";
import axios from "axios";

import {alpha} from "validator/es/lib/alpha";
import AllExercises from "./AllExercises";

export default function Recommnedations(props){


    const [exercises,setExercises] = useState();
    const [videos, setVideos] = useState();

    const subscribedCallback=()=>{
        props.callBack()
    }

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

                    setExercises(res2.data['mostSubscribed'])
                    setVideos(res2.data['videoList'])

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


            {exercises? <AllExercises  data={exercises} callBack={subscribedCallback}/> : "" }

        </>
    )
}