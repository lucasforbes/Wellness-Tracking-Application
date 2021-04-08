import React,{useEffect,useState} from "react";
import ProfessionalDashboard from "./professional/professionalDashboard";
import UserDashboard from "./customers/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";

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


                {userType == "Admin" || userType == "admin" ?

                    <>
                        <AdminDashboard/>
                    </>

                    :
                    ""
                }


            </div>


        </>
    )
}