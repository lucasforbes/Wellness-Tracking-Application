import React,{useState,useEffect} from 'react';

import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';

import validator from 'validator';

export default function Signup(props){


    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();

    const [isLoggedIn,setisLoggedIn] = useState(false);

    useEffect(()=>{
        if ( localStorage.getItem('userName') )
        {
            setisLoggedIn(true)
            setUsername(localStorage.getItem('userName'))
            props.history.push('/about')
        }
    })

    const onSignup=()=>{

        if (validator.isEmail(email)) {

        } else {
            alert("Invalid Email")
            document.getElementById("email").focus();
        }
    }



    return (
        <>


                <center>

                    <div class='card' style={{alignItems:'center'}}>



                        <Card  bgstyle={{ width: '18rem' , border: 'none'}} >

                          <div className={'row'}>

                              <div className={'col-md-7'}>
                                  <img src={process.env.PUBLIC_URL + '/Logo.PNG'} />
                              </div>

                              <div className={'col-md-5'}>

                                  <h3 style={{fontSize:'20px', backgroundColor: 'white !important'}}> <b> <strong>Signup </strong></b>  </h3>

                                  <Card.Body>

                                      <TextField
                                          required
                                          style={{backgroundColor: 'white !important'}}
                                          color={"secondary"}
                                          label="Email"
                                          id={"email"}
                                          // variant="filled"
                                          value={email}
                                          onChange={(e)=>setEmail(e.target.value)}
                                      />

                                      <br/>
                                      <br/>

                                      <TextField
                                          required
                                          style={{background:'white !important'}}
                                          color={"secondary"}
                                          label="Username"
                                          // variant="filled"
                                          value={username}
                                          onChange={(e)=>setUsername(e.target.value)}
                                      />

                                      <br/>
                                      <br/>

                                      <TextField
                                          required
                                          style={{background:'white !important'}}
                                          color={"secondary"}
                                          label="Password"
                                          // variant="filled"
                                          type={"password"}
                                          value={password}
                                          onChange={(e)=>setPassword(e.target.value)}

                                      />

                                      <br/>
                                      <br/>

                                      <Button style={{width:'100px'}} type="button" variant="success" onClick={()=>{
                                          onSignup()
                                      }}> Signup </Button>

                                  </Card.Body>
                              </div>

                          </div>
                        </Card>





                    </div>
                </center>


        </>
    )


}
