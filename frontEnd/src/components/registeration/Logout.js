import React from "react";
import {Button} from "react-bootstrap";

export default function placeholder(){
    return(
        <>
            <Button variant="outline-danger" onClick={()=>{


                setTimeout(function(){
                    localStorage.removeItem('email');
                    localStorage.removeItem('userType');
                    localStorage.removeItem('userFirstName');
                    window.location.href = "/";

                }, 1000);

            }}>  Logout </Button>
        </>
    )
}