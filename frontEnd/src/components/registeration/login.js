import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tab} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from '../../actions/login';
import validator from 'validator';
import Modal from "react-modal";

export default function Login(props){

    const dispatch = useDispatch();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const[confirmCode,setConfirmCode] = useState("");
    const [newPassword,setNewPassword] = useState("");


    const validateParameters=()=>{

        var numbers = /^[0-9]+$/;

        if(confirmCode != "" && confirmCode.length == 6 && confirmCode.match(numbers)){

        }else{
            alert("Invalid Code")
            return false
        }

        if(newPassword != "" && newPassword.length >= 4){

        }else{
            alert("New Password should be atleast  4 characters long")
            return false
        }


        return true
    }


    const [buttonText,setButtonText] = useState("Generate OTP");

    const [resetForm,setResetForm] = useState(false);

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    const [isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            // setEmail(localStorage.getItem('email'))
            window.open("/dashboard", "_self")
            // props.history.push('/dashboard')
        }
    })

    // const onLogin=()=>{
    //
    //     axios.post('http://localhost:27017/login',{
    //         User: "vishal",
    //         Pass: password
    //     })
    //         .then((res)=>{
    //
    //          }).catch((err)=>{
    //
    //          })
    //
    //     }


    const onLogin=async () => {

        if (validator.isEmail(email)) {
            const json = JSON.stringify({
                'password': password,
                'email': email
            });
            const res = axios.post('https://bloom-wellness-back.herokuapp.com/signIn', json, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(function (response) {
                // handle success
                console.log("login status",response);

                if(response.data.status){
                    // alert("Successfully logged In");

                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('userFirstName',response.data.firstName);

                    dispatch(loginAction())

                    setTimeout(function(){
                        // props.history.push('/dashboard');
                        // window.open("/dashboard", "_self")
                            window.open("/dashboard", "_self")
                            localStorage.setItem('userType', response.data.userType);

                    }, 1500);
                }

                else{

                    alert(response.data.errorMessage)

                }






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


    const generateOTP=()=>{
        axios.get('https://bloom-wellness-back.herokuapp.com/sendcode?email='+email,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res)=>{
                 console.log("res",res)

            })
            .catch((err)=>{
                alert("Error generating OTP check your email address")
                console.log(err)
            })
    }


    let json=JSON.stringify({
        'email':email,
        'code':confirmCode,
        'pwd':newPassword
    })

    const sendNewPassword=()=> {
        axios.post('https://bloom-wellness-back.herokuapp.com/findcode',json ,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => {
                console.log("res", res)
                alert("Password Updated")
                setIsOpen(false)
            })
            .catch((err) => {
                alert("Error reseting password")
                console.log(err)
            })
    }

    return (
        <>

            <center>

                <div class='card' style={{alignItems:'center', padding: '15px',opacity: '.8' , backgroundColor: 'lightblue', width: '32vw'}}>


                    <Card style={{height:''}}  bgstyle={{ border: 'none'}} >

                        <div className={'row'} >


                            <div className={'col-md-12'}>

                                <h3 style={{fontSize:'25px', color: 'black !important'}}> <b> <strong>  Login </strong></b>  </h3>

                                <Card.Body style={{backgroundColor: 'lightgreen', width: '30vw'}} >

                                    <TextField
                                        required
                                        style={{background:'black !important', marginTop: '', height: '1.5vw', position: 'relative', bottom: '1vw'}}
                                        color={"blue"}
                                        label="Email"
                                        // variant="filled"
                                        id={"email"}
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                                    <br/>
                                    <br/>

                                    <TextField
                                        required
                                        style={{background:'white !important', height: '1.5vw', marginTop: '', position: 'relative', bottom: '1vw'}}
                                        color={"secondary"}
                                        label="Password"
                                        // variant="filled"
                                        type={"password"}
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}

                                    />


                                    <br/>
                                    <br/>

                                    <Button style={{width:'100px', marginTop: ''}} type="button" variant="success" onClick={()=>{
                                        onLogin()
                                    }}> Login </Button>

                                    <br/>

                                    <div className={"card-body"} style={{color:'blue'}} onClick={()=>setIsOpen(true)}> Forgot Password </div>

                                    <Modal  isOpen={isOpen}
                                            onRequestClose={()=>setIsOpen(false)}
                                            style={customStyles}
                                    >
                                        <div className={"card-body"} style={{paddingRight:'10px',paddingTop:'10px',paddingLeft:'10px',paddingBottom:'10px'}}>

                                            <Button onClick={()=>{
                                                setButtonText("Resend OTP")
                                                generateOTP()
                                                setResetForm(true)
                                            }}>{buttonText}</Button>


                                            {resetForm?
                                                <div className={"row"}>

                                                    <div className={"col-4"}>
                                                        <TextField
                                                            value={confirmCode}
                                                            placeholder={"Enter OTP"}
                                                            onChange={(e)=>setConfirmCode(e.target.value)}
                                                        />

                                                    </div>

                                                    <div className={"col-4"}>

                                                        <TextField
                                                            value={newPassword}
                                                            placeholder={"New Password"}
                                                            onChange={(e)=>setNewPassword(e.target.value)}
                                                        />

                                                    </div>

                                                    <div className={"col-md-4"}>
                                                        <Button variant={"success"} onClick={()=>{
                                                            if(validateParameters()){
                                                                sendNewPassword()
                                                            }
                                                        }}> Submit </Button>
                                                    </div>

                                                </div>
                                            :
                                            ""
                                            }


                                            <br/>
                                            <br/>



                                            <Button onClick={()=>setIsOpen(false)} variant={'danger'}> Close </Button>

                                        </div>

                                    </Modal>


                                </Card.Body>
                            </div>

                        </div>
                    </Card>





                </div>
            </center>


        </>
    )


}
