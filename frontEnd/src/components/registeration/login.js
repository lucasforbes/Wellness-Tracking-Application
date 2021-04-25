import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {useSelector,useDispatch} from 'react-redux';
import {loginAction,logoutAction} from '../../actions/login';
import validator from 'validator';

export default function Login(props){

    const dispatch = useDispatch();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

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

                                    <div className={"card-body"} style={{color:'blue'}}> Forgot Password </div>

                                </Card.Body>
                            </div>

                        </div>
                    </Card>





                </div>
            </center>


        </>
    )


}
