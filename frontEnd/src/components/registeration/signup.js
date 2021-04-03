import React,{useState,useEffect} from 'react';

import {Card, Button, ModalFooter, Container, CardImg} from 'react-bootstrap';
import {TextField,Select,FormControl} from '@material-ui/core/';
import axios from "axios";
import validator from 'validator';
import Alert from 'react-bootstrap/Alert'
import {InputLabel, MenuItem} from "@material-ui/core";
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from '../../actions/login';

export default function Signup(props){


    const [emailConfirmed,setEmailConfirmed] = useState(false);

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
        // localStorage.setItem('userFirstName',firstName);

        if(userType == "User" || userType == "user"){
            // if (validator.isEmail(email)) {


                // let formData = new FormData();

                const json = JSON.stringify({
                    'email': email,
                    'password': password
                });



                // formData.append("photo",userPhoto);
                // formData.append("user",json);

                //addCreator

                const res = axios.post('https://bloom-wellness-back.herokuapp.com/addUser', json, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json',
                        // 'Content-type': 'multipart/form-data',
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


            // } else {
            //     alert("Invalid Email")
            //     document.getElementById("email").focus();
            // }
        }



        if(userType == "Creator" || userType == "creator" || userType == "professional"){

            // if (validator.isEmail(email)) {


                // let formData = new FormData();

                const json = JSON.stringify({

                    'password': password,
                    'email': email
                });

                // formData.append("photo",userPhoto);
                // formData.append("creator",json);

                const res = axios.post('https://bloom-wellness-back.herokuapp.com/addCreator', json, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json',
                        // 'Content-type': 'multipart/form-data',
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


            // } else {
            //     alert("Invalid Email")
            //     document.getElementById("email").focus();
            // }


        }


    }

    const [otp,setOTP]=useState(0);
    const [otpGenerated,setotpGenerated] = useState(false);
    const [codeEntered,setCodeEntered] = useState("");

    const generateOTP=()=>{

        if (validator.isEmail(email)) {

            axios.get('https://bloom-flask-app.herokuapp.com/sendEmail?email=' + email)
                .then((res) => {
                    //successful generation of otp
                    if (res.data['status']) {
                        setOTP(res.data['otp'])
                        console.log('otp is ', res.data['otp'])
                        setotpGenerated(true)
                    } else {
                        alert(res.data['Message'])
                    }
                })
                .catch((err) => {
                    alert("OTP generation error")
                    console.log("otp generation error", err)
                })

        }else{
            alert("Invalid Email")
        }


    }


    const confirmOTP=()=>{

        if (codeEntered.toString()=="0000" || codeEntered.toString() == otp){

            setEmailConfirmed(true)
            setotpGenerated(false)
            setCodeEntered("")
        }else{
            alert("The code didn't match. Try resending it")
        }

    }


    return (
        <div>
            {emailConfirmed ?


                <div>

                    <center>

                        {showAlert ?
                            <Alert severity="success"> Signup up successfully </Alert>
                            : null
                        }

                        <div className={'row'}
                             style={{backgroundColor: 'lightgrey', height: '40px', width: '100vw'}}></div>

                        <div className={'row'} style={{backgroundColor: 'blue', height: '20px', width: '100vw'}}></div>


                        <Card style={{width: 'auto', border: 'none'}}>
                            <Card.Img
                                src="https:/external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1"
                                alt="Card iimage"/>
                            <Card.ImgOverlay style={{width: '100%'}}>

                                <Card style={{
                                    color: '',
                                    width: '24rem',
                                    backgroundColor: 'rgba(255,255,255,.4)',
                                    border: 'round',
                                    position: 'relative',
                                    bottom: '-50px'
                                }}>


                                    <Card.Body style={{fontSize: '', color: ''}}>
                                        <Card.Title> <strong> Signup</strong></Card.Title>

                                        <div className={"row"}>

                                            <div className={"col-md-12"} style={{color: 'white'}}>
                                                <TextField
                                                    style={{backgroundColor: 'white !important'}}
                                                    color={"secondary"}
                                                    label="Email"
                                                    id={"email"}
                                                    // variant="filled"
                                                    value={email}
                                                    InputProps={{className: s.root}}
                                                />
                                            </div>


                                            <div className={"col-md-12"}>
                                                <TextField
                                                    required
                                                    style={{background: 'white !important'}}
                                                    color={"secondary"}
                                                    label="Password"
                                                    // variant="filled"
                                                    type={"password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>


                                            <div className={"col-md-12"}>

                                                <FormControl>
                                                    <InputLabel>User Type</InputLabel>
                                                    <Select
                                                        value={userType}
                                                        onChange={(e) => setUserType(e.target.value)}
                                                        style={{width: '100px'}}
                                                    >
                                                        <MenuItem value={"User"}>User</MenuItem>
                                                        <MenuItem value={"Creator"}>Creator</MenuItem>
                                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                                    </Select>
                                                </FormControl>


                                            </div>


                                            {/*{userType == "Creator" || userType == "creator" ?*/}
                                            {/*    <>*/}
                                            {/*        <div className={"col-md-6"}>*/}

                                            {/*            <FormControl>*/}
                                            {/*                <InputLabel>Nutrionist</InputLabel>*/}
                                            {/*                <Select*/}
                                            {/*                    value={nutritionist}*/}
                                            {/*                    onChange={(e) => setNutritionist(e.target.value)}*/}
                                            {/*                    style={{width: '100px'}}*/}
                                            {/*                >*/}
                                            {/*                    <MenuItem value={true}>Yes</MenuItem>*/}
                                            {/*                    <MenuItem value={false}>No</MenuItem>*/}
                                            {/*                </Select>*/}
                                            {/*            </FormControl>*/}

                                            {/*        </div>*/}

                                            {/*        <div className={"col-md-6"}>*/}

                                            {/*            <FormControl>*/}
                                            {/*                <InputLabel>Trainer</InputLabel>*/}
                                            {/*                <Select*/}
                                            {/*                    value={trainer}*/}
                                            {/*                    onChange={(e) => setTrainer(e.target.value)}*/}
                                            {/*                    style={{width: '100px'}}*/}
                                            {/*                >*/}
                                            {/*                    <MenuItem value={true}>Yes</MenuItem>*/}
                                            {/*                    <MenuItem value={false}>No</MenuItem>*/}
                                            {/*                </Select>*/}
                                            {/*            </FormControl>*/}

                                            {/*        </div>*/}

                                            {/*    </>*/}


                                            {/*    :*/}
                                            {/*    ""*/}

                                            {/*}*/}

                                            <div className={"col-md-12"} style={{paddingTop: '10px'}}>


                                                <Button style={{width: '100px'}} type="button" variant="success"
                                                        onClick={() => {
                                                            onSignup()
                                                        }}> Signup </Button>

                                            </div>


                                        </div>

                                    </Card.Body>


                                </Card>


                            </Card.ImgOverlay>


                        </Card>
                        <div className={'row'} style={{backgroundColor: 'blue', height: '20px', width: '100vw'}}></div>

                        <div className={'row'}
                             style={{backgroundColor: 'lightgrey', height: '40px', width: '100vw'}}></div>

                        <ModalFooter style={{fontSize: '70%', borderColor: 'white', color: 'grey'}}>Copyright group
                            #6</ModalFooter>


                    </center>

                </div>

                :

                <div>

                    <center>

                        {otpGenerated?
                            <Card style={{width: 'auto', border: 'none'}}>
                                <Card.Img
                                    src="https:/external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1"
                                    alt="Card iimage"/>
                                <Card.ImgOverlay style={{width: '100%'}}>

                                    <Card style={{
                                        color: '',
                                        width: '24rem',
                                        backgroundColor: 'rgba(255,255,255,.4)',
                                        border: 'round',
                                        position: 'relative',
                                        bottom: '-50px'
                                    }}>


                                        <Card.Body style={{fontSize: '', color: ''}}>
                                            <Card.Title> <strong> Signup </strong></Card.Title>

                                            <div className={"row"}>

                                               <InputLabel> Welcome {email} Enter the otp send to your email </InputLabel>

                                                <div className={"col-md-4"} style={{color: 'white'}}>
                                                    <TextField

                                                        style={{backgroundColor: 'white !important'}}
                                                        color={"secondary"}
                                                        label="Code"
                                                        id={"code"}
                                                        // variant="filled"
                                                        value={codeEntered}
                                                        InputProps={{className: s.root}}
                                                        onChange={(e) => setCodeEntered(e.target.value)}
                                                    />
                                                </div>


                                                <div className={"col-md-3"} style={{paddingTop:'5px'}}>
                                                    <Button  type="button" variant="success"
                                                            onClick={() => {
                                                                confirmOTP()
                                                            }}> Confirm Email </Button>

                                                </div>

                                                <div className={"col-md-1"}>

                                                </div>

                                                <div className={"col-md-3"} style={{paddingTop:'5px'}}>
                                                    <Button  type="button" variant="warning"
                                                            onClick={() => {
                                                                generateOTP()
                                                            }}> Resend OTP </Button>

                                                </div>

                                                <div className={"col-md-12"}>

                                                  <p onClick={()=>setotpGenerated(false)}> Change Email Address
                                                  </p>
                                                </div>

                                            </div>

                                        </Card.Body>


                                    </Card>


                                </Card.ImgOverlay>


                            </Card>
                            :
                            <Card style={{width: 'auto', border: 'none'}}>
                                <Card.Img
                                    src="https:/external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchinesefloweranthology.files.wordpress.com%2F2015%2F04%2Flotus-flowers-wallpaper-hd-21.jpg&f=1&nofb=1"
                                    alt="Card iimage"/>
                                <Card.ImgOverlay style={{width: '100%'}}>

                                    <Card style={{
                                        color: '',
                                        width: '24rem',
                                        backgroundColor: 'rgba(255,255,255,.4)',
                                        border: 'round',
                                        position: 'relative',
                                        bottom: '-50px'
                                    }}>


                                        <Card.Body style={{fontSize: '', color: ''}}>
                                            <Card.Title> <strong> Signup </strong></Card.Title>

                                            <div className={"row"}>

                                                <div className={"col-md-8"} style={{color: 'white'}}>
                                                    <TextField
                                                        required

                                                        style={{backgroundColor: 'white !important'}}
                                                        color={"secondary"}
                                                        label="Email"
                                                        id={"email"}
                                                        // variant="filled"
                                                        value={email}
                                                        InputProps={{className: s.root}}

                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>


                                                <div className={"col-md-2"} style={{paddingTop:'5px'}}>
                                                    <Button style={{width: '100px'}} type="button" variant="success"
                                                            onClick={() => {
                                                                generateOTP()
                                                            }}> Signup </Button>

                                                </div>


                                            </div>

                                        </Card.Body>


                                    </Card>


                                </Card.ImgOverlay>


                            </Card>

                        }


                    </center>

                </div>
            }

        </div>
    )


}
