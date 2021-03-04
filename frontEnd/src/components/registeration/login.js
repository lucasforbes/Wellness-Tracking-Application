import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';

import validator from 'validator';

export default function Login(props){


    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            // setEmail(localStorage.getItem('email'))
            props.history.push('/dashboard')
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
            const res = axios.post('http://localhost:8080/signIn', json, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(function (response) {
                // handle success
                console.log("login status",response);

                if(response.data.status){
                    alert("Successfully logged In");

                    localStorage.setItem('email', response.data.email);


                    setTimeout(function(){
                        props.history.push('/dashboard');
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

                <div class='card' style={{alignItems:'center'}}>



                    <Card  bgstyle={{ width: '18rem' , border: 'none'}} >

                        <div className={'row'}>

                            <div className={'col-md-7'}>
                                <img src={process.env.PUBLIC_URL + '/Meditation.PNG'} />
                            </div>

                            <div className={'col-md-5'}>

                                <h3 style={{fontSize:'20px', backgroundColor: 'white !important'}}> <b> <strong> Login </strong></b>  </h3>

                                <Card.Body>

                                    <TextField
                                        required
                                        style={{background:'white !important'}}
                                        color={"secondary"}
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
                                        onLogin()
                                    }}> Login </Button>

                                    <br/>
                                    <br/>

                                    <p onClick={()=>props.history.push('/signup')}> New User Sign Up Here </p>


                                </Card.Body>
                            </div>

                        </div>
                    </Card>





                </div>
            </center>


        </>
    )


}
