import React,{useState,useEffect} from "react";
import axios from "axios";

import {alpha} from "validator/es/lib/alpha";
import AllExercises from "./AllExercises";
import Iframe from 'react-iframe';

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


            <div className={"card-header text-white bg-primary"} style={{fontFamily: 'cursive',fontWeight: '600', fontSize: '130%', textDecoration: 'underline'}}> Suggested Videos</div>
            <div className={"row"} style={{paddingLeft:'10px',paddingTop:'10px', backgroundColor: 'lightblue', fontSize: '130%', fontFamily: 'cursive'}}>
            {videos? videos.map((video,index)=>{
                return(
                    <div id={index} className={"col-md-4 card text-white"} style={{borderWidth:'10px',borderColor:'lightblue', backgroundColor: 'lightblue'}}>
                        <div className={"card-header"} style={{backgroundColor:'lightgreen', color: 'dodgerblue', textDecoration: 'underline', fontWeight: '600'}}> {video['Exercises Title']}</div>
                        <div className={"card-body"} style={{backgroundColor: 'lightGreen'}}> Exersize Description:
                            <br/>
                            {video['Exersize Description']} {"  "} <a href={video['Exersize Video Link']}  target={"_blank"} >
                                <div style={{width:'min-content',paddingLeft:'3px',paddingRight:'3px', color: 'blue'}} className={" text-lightblue"} >Video </div> </a>
                        <br/>





                            {/*<Iframe url={"http://www.youtube.com/watch?v=qm67wbB5GmI"}*/}
                            {/*        */}
                            {/*        width="450px"*/}
                            {/*        height="400px"*/}
                            {/*        id="myId"*/}
                            {/*        className="myClassname"*/}
                            {/*        display="initial"*/}
                            {/*        position="relative"/>*/}

                        </div>

                    </div>
                )
            }):""
            }
            </div>

        </>
    )
}