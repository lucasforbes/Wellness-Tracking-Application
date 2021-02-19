import React,{useState,useEffect} from 'react';

import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import axios from "axios";
import validator from 'validator';

export default function Signup(props){


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    // const [age,setAge] = useState(18);
    const [birthDate,setBirthDate] = useState(new Date().toISOString().split("T")[0]);
    const [gender,setGender] = useState("male");
    const [userType,setUserType] = useState("User");

    const [isLoggedIn,setisLoggedIn] = useState(false);

    useEffect(()=>{
        if ( localStorage.getItem('userName') )
        {
            setisLoggedIn(true)
            // setUsername(localStorage.getItem('userName'))
            props.history.push('/about')
        }
    })

    const onSignup=()=>{

        if (validator.isEmail(email)) {

            axios.post('http://localhost:8080/addUser',{
                'password':password,
                'email': email,
                'firstName':firstName,
                'lastName':lastName,
                'birthday': birthDate,
                'userType':userType,
                'gender': gender
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })


        } else {
            alert("Invalid Email")
            document.getElementById("email").focus();
        }
    }



    return (
        <>


                <center>

                    <div className='card' style={{alignItems:'center'}}>



                        <Card  bgstyle={{ width: '18rem' , border: 'none'}} >

                          <div className={'row'}>

                              <div className={'col-md-7'}>
                                  <img src={process.env.PUBLIC_URL + '/Logo.PNG'} />
                              </div>

                              <div className={'col-md-5'}>

                                  <h3 style={{fontSize:'20px', backgroundColor: 'white !important'}}> <b> <strong>Signup </strong></b>  </h3>

                                  <Card.Body>

                                      <div className={"row"}>

                                          <div className={"col-md-6"}>
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
                                          </div>


                                          <div className={"col-md-6"}>
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
                                          </div>

                                          <div className={"col-md-6"}>
                                              <TextField
                                                  required
                                                  style={{backgroundColor: 'white !important'}}
                                                  color={"secondary"}
                                                  label="First Name"
                                                  id={"firstName"}
                                                  // variant="filled"
                                                  value={firstName}
                                                  onChange={(e)=>setFirstName(e.target.value)}
                                              />
                                          </div>


                                          <div className={"col-md-6"}>
                                              <TextField
                                                  required
                                                  style={{background:'white !important'}}
                                                  color={"secondary"}
                                                  label="Last Name"
                                                  // variant="filled"
                                                  type={"text"}
                                                  value={lastName}
                                                  onChange={(e)=>setLastName(e.target.value)}

                                              />
                                          </div>


                                          <div className={"col-md-6"}>
                                              <TextField
                                                  required
                                                  style={{backgroundColor: 'white !important'}}
                                                  color={"secondary"}
                                                  label="Birth Date"
                                                  id={"birthdate"}
                                                  type={"date"}
                                                  // variant="filled"
                                                  value={birthDate}
                                                  onChange={(e)=>setBirthDate(e.target.value)}
                                              />
                                          </div>


                                          {/*<div className={"col-md-6"}>*/}
                                          {/*    <TextField*/}
                                          {/*        required*/}
                                          {/*        style={{background:'white !important'}}*/}
                                          {/*        color={"secondary"}*/}
                                          {/*        label="Age"*/}
                                          {/*        // variant="filled"*/}
                                          {/*        type={"number"}*/}
                                          {/*        value={age}*/}
                                          {/*        onChange={(e)=>setAge(e.target.value)}*/}

                                          {/*    />*/}
                                          {/*</div>*/}

                                          <div className={"col-md-6"}>
                                              <TextField
                                                  required
                                                  style={{backgroundColor: 'white !important'}}
                                                  color={"secondary"}
                                                  label="Gender"
                                                  id={"gender"}
                                                  // variant="filled"
                                                  value={gender}
                                                  onChange={(e)=>setGender(e.target.value)}
                                              />
                                          </div>


                                          <div className={"col-md-6"}>
                                              <TextField
                                                  required
                                                  style={{background:'white !important'}}
                                                  color={"secondary"}
                                                  label="User type"
                                                  // variant="filled"
                                                  type={"text"}
                                                  value={userType}
                                                  onChange={(e)=>setUserType(e.target.value)}

                                              />
                                          </div>


                                          <div className={"col-md-12"} style={{paddingTop:'10px'}}>



                                          <Button style={{width:'100px'}} type="button" variant="success" onClick={()=>{
                                              onSignup()
                                          }}> Signup </Button>

                                        </div>


                                      </div>

                                  </Card.Body>
                              </div>

                          </div>
                        </Card>





                    </div>
                </center>


        </>
    )


}
