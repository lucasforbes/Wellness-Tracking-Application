import React,{useEffect,useState} from "react";
import ProfessionalDashboard from "./professional/professionalDashboard";

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
            <br/>

            Usertype : {" "+userType}
            <br/>

            {userType == "Professional" ? <><ProfessionalDashboard/> </>
                : ""}

        </>
    )
}