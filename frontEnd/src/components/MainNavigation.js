import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from "../actions/login";

export default function MainNavigation(props){


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

            {userLoggedIn ? <>

                    <Navbar bg="dark" variant="dark" sticky={'top'} style={{fontFamily: 'Cursive'}}>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src="Bloom Wellness White Background.jpg"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                            />
                            Bloom Wellness
                        </Navbar.Brand>

                        <Nav className="mr-auto">
                            <Button variant="dark" ><Link to={""}>Home</Link></Button> {" "}
                            <Button variant="dark" > <Link to={"about"}> About </Link> </Button>
                            <Button variant="dark" > <Link to={"signup"}> Signup </Link> </Button>
                            <Button variant="outline-danger" onClick={()=>{


                                setTimeout(function(){
                                    localStorage.removeItem('email');
                                    localStorage.removeItem('userType');
                                    localStorage.removeItem('userFirstName');
                                    window.location.href = "/";

                                }, 1000);

                            }}>  Logout </Button>


                        </Nav>

                    </Navbar>


                </> :
                <Navbar bg="dark" variant="dark" sticky={'top'} style={{fontFamily: 'Cursive'}}>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="Bloom Wellness White Background.jpg"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />
                        Bloom Wellness
                    </Navbar.Brand>

                    <Nav className="mr-auto">
                        <Button variant="dark" ><Link to={""}>Home</Link></Button> {" "}
                        <Button variant="dark" > <Link to={"about"}> About </Link> </Button>
                        <Button variant="dark" > <Link to={"signup"}> Signup </Link> </Button>



                    </Nav>

                </Navbar>
            }

        </>
    )


}
