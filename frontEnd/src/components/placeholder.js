import React from "react";
import Chat from "../components/chat/chat";
import Creatorchat from "./chat/CreatorChat";
export default function placeholder(){
    return(
        <>
            Add Page

            {localStorage.getItem('userType') == "User" ?
                <Chat/> :
                <Creatorchat/>
            }

            {/*<div  style={{overflowY:'scroll',height:'400px', background:'gray'}}>*/}
            {/*    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.*/}
            {/*</div>*/}

        </>
    )
}