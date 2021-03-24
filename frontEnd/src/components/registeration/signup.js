import React,{useState,useEffect} from 'react';

import {Card, Button, ModalFooter} from 'react-bootstrap';
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
    const [userPhoto,setUserPhoto] = useState();



    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            window.open("/dashboard", "_self")
            // props.history.push('/dashboard')
        }
    })

    const fileChangedHandler = event => {
        setUserPhoto(event.target.files[0])
    }

    const s = {
        root: {
            background: "black",
            color: 'white'
        },
        input: {
            width: '1000px',
            backgroundColor: 'red'
        }
    }


    const [trainer,setTrainer] = useState(true);

    const [nutritionist,setNutritionist] = useState(false);


    const onSignup=async () => {

        localStorage.setItem('userType', userType);
        localStorage.setItem('userFirstName',firstName);

        if(userType == "User" || userType == "user"){
            if (validator.isEmail(email)) {


                let formData = new FormData();

                const json = JSON.stringify({
                    // 'id': 3,
                    'password': password,
                    'email': email,
                    'firstName': firstName,
                    'lastName': lastName,
                    //yyyy-mm-dd
                    'birthday': birthDate,
                    // 'userType': userType,
                    'gender': gender,
                    'online': true,
                    'isDeleted': false
                });

                // for creator
                // 'boolean': nutritionist
                // 'boolean': trainer



                formData.append("photo",userPhoto);
                formData.append("user",json);

                //addCreator

                const res = axios.post('https://bloom-wellness-back.herokuapp.com/addUser', formData, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        // 'Content-Type': 'application/json',
                        'Content-type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(function (response) {
                    // handle success
                    console.log("signup status",response);

                    setShowAlert(true);

                    localStorage.setItem('email', email);
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



        if(userType == "Creator" || userType == "creator" || userType == "professional"){

            if (validator.isEmail(email)) {


                let formData = new FormData();

                const json = JSON.stringify({

                    'password': password,
                    'email': email,
                    'firstName': firstName,
                    'lastName': lastName,
                    'birthday': birthDate,
                    'gender': gender,
                    'online': true,
                    'nutritionist': nutritionist,
                    'trainer': trainer
                });

                formData.append("photo",userPhoto);
                formData.append("creator",json);

                const res = axios.post('https://bloom-wellness-back.herokuapp.com/addCreator', formData, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        // 'Content-Type': 'application/json',
                        'Content-type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(function (response) {
                    // handle success
                    console.log("signup status for Creator",response);

                    setShowAlert(true);

                    localStorage.setItem('email', email);
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


    }



    return (
        <>


                <center>

                    {showAlert?
                    <Alert severity="success"> Signup up successfully </Alert>
                        :null
                    }
                    <div className={'row'} style={{backgroundColor: 'lightgrey', height:'40px'}}></div>
                    <div className={'row'} style={{backgroundColor: 'blue', height:'20px'}}></div>


                    <div className='box' style={{backgroundSize: 'cover',height: '82vh', alignItems:'center', backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1)'}}>




                        <Card style =  {{color: '', width: '24rem' ,backgroundColor: 'rgba(255,255,255,.4)', border: 'round', position: 'relative', bottom: '-50px'}} >


                            <Card.Body style = {{fontSize: '',color: ''}}>
                                <Card.Title> <strong> Signup</strong></Card.Title>

                                <div className={"row"} >

                                          <div className={"col-md-6"} style={{color: 'white'}}>
                                              <TextField
                                                  required

                                                  style={{backgroundColor: 'white !important'}}
                                                  color={"secondary"}
                                                  label="Email"
                                                  id={"email"}
                                                  // variant="filled"
                                                  value={email}
                                                  InputProps={{className: s.root}}

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


                                          {userType == "Creator" || userType=="creator"?
                                              <>
                                              <div className={"col-md-6"}>

                                                  <FormControl>
                                                      <InputLabel>Nutrionist</InputLabel>
                                                      <Select
                                                          value={nutritionist}
                                                          onChange={(e)=>setNutritionist(e.target.value)}
                                                          style={{width:'100px'}}
                                                      >
                                                          <MenuItem value={true}>Yes</MenuItem>
                                                          <MenuItem value={false}>No</MenuItem>
                                                      </Select>
                                                  </FormControl>

                                              </div>

                                              <div className={"col-md-6"}>

                                                  <FormControl>
                                                      <InputLabel>Trainer</InputLabel>
                                                      <Select
                                                          value={trainer}
                                                          onChange={(e)=>setTrainer(e.target.value)}
                                                          style={{width:'100px'}}
                                                      >
                                                          <MenuItem value={true}>Yes</MenuItem>
                                                          <MenuItem value={false}>No</MenuItem>
                                                      </Select>
                                                  </FormControl>

                                              </div>

                                              </>


                                              :
                                              ""

                                          }



                                          <div className={"col-md-12"}>
                                              <br/>

                                              <input type="file"  required onChange={fileChangedHandler}/>
                                          </div>


                                          <div className={"col-md-12"} style={{paddingTop:'10px'}}>



                                          <Button style={{width:'100px'}} type="button" variant="success" onClick={()=>{
                                              onSignup()
                                          }}> Signup </Button>

                                        </div>


                                      </div>

                                  </Card.Body>


                        </Card>


                    </div>
                    <div className={'row'} style={{backgroundColor: 'blue', height:'20px'}}></div>

                    <div className={'row'} style={{backgroundColor: 'lightgrey', height:'40px'}}></div>
                    <ModalFooter style={{fontSize: '70%', borderColor: 'white', color: 'grey'}}>Copyright group #6</ModalFooter>

                </center>


        </>
    )


}
