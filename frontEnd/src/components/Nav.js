import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from "../actions/login";

export default function Navigation(props){


    const userLoggedIn = useSelector(state => state)

    const dispatch = useDispatch();

    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            dispatch(loginAction())
        }
    })


    return (

        <>

            <div style={{float:'right',paddingTop:'5px',width:'100%',paddingBottom:'10px'}}>
                <Button variant="outline-primary"> <Link to={"/"} > Home </Link></Button>{' '}

                {userLoggedIn?<></>:
                    <>
                    <Button variant="outline-primary" > <Link to={"/login"}> Login </Link> </Button> {''}
                    </>
                    }
                <Button variant="outline-primary" > <Link to={"/signup"}> Signup </Link> </Button> {''}


                <Button variant="outline-primary"> <Link to={"/about"}> About </Link> </Button> {''}


                {userLoggedIn?

                    <>

                    <Button variant={'warning'}> Edit Profile </Button>


                <Button variant="outline-danger" onClick={()=>{

                    alert("Logged out")
                    setTimeout(function(){
                        localStorage.removeItem('email');
                        window.location.href = "/";

                    }, 2000);

                }}>  Logout </Button>


                    </>
                    :
                    <>
                    </>
                }




            </div>

        </>
    )


}
