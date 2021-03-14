import React,{useState,useEffect} from 'react';

import {Card,Button} from 'react-bootstrap';
import {TextField,Select,FormControl} from '@material-ui/core/';
import axios from "axios";
import validator from 'validator';
import Alert from 'react-bootstrap/Alert'
import {InputLabel, MenuItem} from "@material-ui/core";
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from '../../actions/login';

export default function Signup(props){

    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    // const [age,setAge] = useState(18);
    const [birthDate,setBirthDate] = useState(new Date().toISOString().split("T")[0]);
    const [gender,setGender] = useState("male");
    const [userType,setUserType] = useState("User");
    const[showAlert,setShowAlert] = useState(false);



    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            window.open("/dashboard", "_self")
            // props.history.push('/dashboard')
        }
    })

    const onSignup=async () => {

        localStorage.setItem('userType', userType);
        localStorage.setItem('userFirstName',firstName);

        if (validator.isEmail(email)) {
            const json = JSON.stringify({
                'id': 3,
                'password': password,
                'email': email,
                'profilePic': null,
                'firstName': firstName,
                'lastName': lastName,
                'birthday': birthDate,
                'userType': userType,
                'gender': gender,
                'online': true,
                'isDeleted': false
            });
            const res = axios.post('https://bloom-wellness-back.herokuapp.com/addUser', json, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(function (response) {
                    // handle success
                    console.log("signup status",response);

                    setShowAlert(true);

                    localStorage.setItem('email', setEmail);
                    dispatch(loginAction())

                    setTimeout(function(){ setShowAlert(false)
                        // props.history.push('/dashboard');
                        window.open("/dashboard", "_self")

                    }, 1500);

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

                    {showAlert?
                    <Alert severity="success"> Signup up successfully </Alert>
                        :null
                    }
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

                                          <div className={'col-md-12'}> <br/> </div>


                                          <div className={"col-md-4"}>
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


                                          <div className={"col-md-4"}>

                                              <FormControl>
                                                  <InputLabel>Gender</InputLabel>
                                                  <Select
                                                      value={gender}
                                                      onChange={(e)=>setGender(e.target.value)}
                                                      style={{width:'100px'}}
                                                  >
                                                      <MenuItem value={"male"}>Male</MenuItem>
                                                      <MenuItem value={"female"}>Female</MenuItem>
                                                      <MenuItem value={"other"}>Other</MenuItem>
                                                  </Select>
                                              </FormControl>


                                          </div>





                                          <div className={"col-md-4"}>

                                              <FormControl>
                                                  <InputLabel>User Type</InputLabel>
                                                  <Select
                                                      value={userType}
                                                      onChange={(e)=>setUserType(e.target.value)}
                                                      style={{width:'100px'}}
                                                  >
                                                      <MenuItem value={"User"}>User</MenuItem>
                                                      <MenuItem value={"Creator"}>Creator</MenuItem>
                                                      <MenuItem value={"Admin"}>Admin</MenuItem>
                                                  </Select>
                                              </FormControl>




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
