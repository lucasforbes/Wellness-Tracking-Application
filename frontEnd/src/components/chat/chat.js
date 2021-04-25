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

    let socket = new WebSocket("wss://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'));

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
    }, 5000);


    if(socket){
        socket.onmessage = function(event){
            var result = JSON.parse(event.data)

            let tempHistory = chatHistory;

             console.log("event",result['from'],tempHistory,"temp");

             if(result['from'] in tempHistory) {
                 tempHistory[result['from']].push({'person': 'creator', 'message': result['message']})
             }
            setChatHistory(tempHistory)
            console.log("Data to react",result)
        }
    }else{
    }

    socket.onclose = function(){

        // socket = new WebSocket("ws://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'))
    }

    const [enteredMessage,setEnteredMessage] = useState("");

    const sendMessage=()=>{

        if(!socket){
            socket = new WebSocket("wss://bloom-wellness-back.herokuapp.com/chat/"+localStorage.getItem('email'));
        }

        let message = {
            "time": new Date(),
            "from": localStorage.getItem('email'),
            "to": creatorSelected,
            "message": enteredMessage
        }

        try {
            socket.send(JSON.stringify(message));
        }
        catch(err) {
           alert("Not able to send Message Still in connecting mode try again")
        }

            let tempHistory = chatHistory;

            tempHistory[creatorSelected].push({'person':'user','message':enteredMessage})
            setChatHistory(tempHistory)

    }


    return(

        <>
            <br/>
                <div className={"row"}>

                    <div className={"col-md-2"}>
                        <div className={"card-header"} style={{fontWeight: '600',color: 'white',fontFamily: 'cursive', textDecoration: 'underline' , fontSize: '120%',backgroundColor: 'lightgreen', borderBottom: 'inset 5px green',borderTop: 'solid 7px white', borderRight: 'inset 5px dodgerblue', borderLeft: 'inset 5px dodgerblue'}}> Professionals </div>
                        {allCreators && allCreators.length > 0 ? allCreators.map((creator,index)=> {

                            let image = images[index%4]
                                return (
                                    <div className={"card text-white bg-primary"}  style={{marginTop: '10px', borderRight: 'solid 5px white',borderTop: 'solid 5px lightgreen',borderLeft: 'solid 5px blue', borderBottom: 'solid 5px lightgreen'}} onClick={()=>setCreatorSelected(creator.email)}>
                                        <img style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + image} />
                                        {creator.email}
                                    </div>
                                )
                            }):""
                        }
                    </div>

                    <div className={"cols-md-8 card bg-grey"} style={{fontFamily: 'cursive', backgroundColor: 'floralwhite'}}>
                        <div className={"card-header text-white bg-danger overflowY:'scroll',height:'100px',width:'1200px'"} style={{color: 'white'}}>Contact: {creatorSelected?creatorSelected:""} </div>

                        {creatorSelected && chatHistory[creatorSelected] &&

                        chatHistory[creatorSelected].length > 0 ? chatHistory[creatorSelected].map((obj,index)=>{

                            const styleUser ={
                                borderRadius: '25px',
                                float: 'right',
                                backgroundColor:'dodgerblue',
                                width:'70%',
                                paddingLeft:'10px',
                                marginTop: '5px'
                            }

                            const styleCreator={
                                borderRadius: '25px',
                                float: 'left',
                                backgroundColor: 'coral',
                                width:'70%',
                                paddingLeft:'10px',
                                marginTop: '5px'

                            }

                            return(
                                <div>
                                <div className={"text-white mb-6"} style={obj.person == "user" ?  styleUser : styleCreator}>
                                    {obj.message}
                                </div>
                                </div>
                                )
                        })
                            :
                            ""
                        }

                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <TextField placeholder={"Enter Message ...."} value={enteredMessage} onChange={(e)=>{
                            setEnteredMessage(e.target.value)
                        }} style={{minWidth:"200px",marginTop: 'auto'}}/>

                        {creatorSelected?<Button className={"bg-success"} onClick={()=>{
                            sendMessage()
                            setTimeout(
                                function() {
                                    setEnteredMessage("")
                                }, 2000);
                        }} style={{height: '60px'}}> Send Message </Button>:""}
                            </div>



                </div>
        </>
    )

}
