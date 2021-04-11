import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import socketIOClient from "socket.io-client";

const ENDPOINT = "ws://bloom-wellness-back.herokuapp.com/chat/";

export default function Chat(props){

    const [allCreators,setAllCreators] = useState();
    const [creatorSelected,setCreatorSelected] = useState("");

    let socket = new WebSocket("ws://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'));

    const images=["user1.png","user2.png","user3.png","user4.png"];

    const [resetSocket,setresetSocket] = useState(true);

    const[chatHistory,setChatHistory] = useState();

    useEffect(()=>{

        axios.get('https://bloom-wellness-back.herokuapp.com/findAllCreators')
            .then((res)=>{
                setAllCreators(res.data)

                console.log(res.data,"creators")
                let tempChat = {}

                for(let i=0;i < res.data.length;i++){
                    tempChat[res.data[i]['email']] = new Array()
                    // console.log("email",res.data[i]['email'])
                }

                setChatHistory(tempChat)

            })
            .catch((err)=>{
                console.log("Error while fetching Creators",err)
            })

    },[])

    // useEffect(() => {
    //     setInterval(function(){ ;}, 10000);
    //
    //     console.log("making connection .....................")
    // });

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         socket = new WebSocket("ws://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'))
    //
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, []);

    setTimeout(function(){
        // window.location.reload(1);
        setresetSocket(!resetSocket)
    }, 10000);


    if(socket){
        socket.onmessage = function(event){
            var result = event.data
            console.log("Data to react",result)
        }
    }else{
    }

    socket.onclose = function(){

        // socket = new WebSocket("ws://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'))
    }


    return(

        <>
            {JSON.stringify(chatHistory)}
                <div className={"row"}>

                    <div className={"col-md-2"}>
                        <div className={"card-header"}>Professional and Dietitians </div>
                        {allCreators && allCreators.length > 0 ? allCreators.map((creator,index)=> {

                            let image = images[index%4]
                                return (
                                    <div className={"card text-white bg-primary"} onClick={()=>setCreatorSelected(creator.email)}>
                                        <img style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + image} />
                                        {creator.email}
                                    </div>
                                )
                            }):""
                        }
                    </div>

                    <div className={"cols-md-5 card"}>
                        {creatorSelected}
                    </div>


                </div>
        </>
    )

}
