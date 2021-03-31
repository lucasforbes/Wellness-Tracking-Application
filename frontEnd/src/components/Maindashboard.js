import React,{useEffect,useState} from "react";
import ProfessionalDashboard from "./professional/professionalDashboard";
import UserDashboard from "./customers/UserDashboard";

export default function Maindashboard(){

    const [userType,setUserType] = useState();

    useEffect(()=>{
        if ( localStorage.getItem('userType') )
        {
            setUserType(localStorage.getItem('userType'))
        }
    })


    return(
        <>
            <div style={{}}>

            {userType == "Creator" ? <><ProfessionalDashboard/> </>
                : ""}

            {userType == "User" || userType == "user" ?

                <>
                <UserDashboard/>
                </>

                :
                ""
            }

            </div>


        </>
    )
}