import React,{useState,useEffect} from 'react';

import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';

export default function Login(props){


    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [isLoggedIn,setisLoggedIn] = useState(false);

    useEffect(()=>{
        if ( localStorage.getItem('userName') )
            {
                setisLoggedIn(true)
                setUsername(localStorage.getItem('userName'))
                props.history.push('/about')
            }
    })



    return (
        <>

            { !isLoggedIn ?


                <center>

                    <div class='card' style={{alignItems:'center'}}>



                        <Card bg={'PRIMARY'.toLowerCase()} style={{ width: '18rem' }} >

                            <Card.Body>

                                <TextField
                                    required
                                    style={{background:'white'}}
                                    color={"secondary"}
                                    label="Username"
                                    variant="filled"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />

                                <br/>
                                <br/>

                                <TextField
                                    required
                                    style={{background:'white'}}
                                    color={"secondary"}
                                    label="Password"
                                    variant="filled"
                                    type={"password"}
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}

                                />

                                <br/>
                                <br/>

                                <Button type="button" variant="success" onClick={()=>{
                                    setisLoggedIn(true)

                                    props.history.push('/about')
                                }}> Login </Button>

                                <br/>

                                <p onClick={()=> props.history.push('/signup')}>
                                    New User Sign Up Here
                                </p>

                            </Card.Body>
                        </Card>





                    </div>
                </center>

               :

                <Card bg={'Success'.toLowerCase()}  text={'white'} style={{display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'}}>

                    <Card.Body>

                        Already Logged In

                    </Card.Body>
                </Card>


            }
        </>
    )


}
