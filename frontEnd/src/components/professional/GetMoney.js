import React,{useState,useEffect} from "react";

import axios from "axios";
import {loginAction} from "../../actions/login";
import {Button, Tab} from "react-bootstrap";
import Modal from "react-modal";
import {InputLabel, TextField} from "@material-ui/core";

export default function GetMoney(){


    const [balance,setBalance] = useState(0);

    const [modalIsOpen,setIsOpen] = React.useState(false);

    useEffect(()=>{
        axios.post('https://bloom-wellness-back.herokuapp.com/getCreatorBalance?email='+localStorage.getItem('email'), {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
            }).then(function (response) {

                setBalance(response.data)

             })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    },[])


    const [accountNumber, setAccountNumber] = useState("")
    const [routingNumber,setRoutingNumber] = useState("")

    const validateParameters=()=>{

        var numbers = /^[0-9]+$/;

        if(accountNumber != "" && accountNumber.length == 10 && accountNumber.match(numbers)){

        }else{
            alert("Invalid Account Number")
            return false
        }

        if(routingNumber != "" && routingNumber.length == 9 && routingNumber.match(numbers)){

        }else{
            alert("Invalid Routing Number")
            return false

        }

        return  true
    }

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

    const withdraw=()=>{

        let json=JSON.stringify({
            'creatorEmail':localStorage.getItem('email'),
            'accountNumber': accountNumber,
            'routingNumber': routingNumber
        })
        axios.post('https://bloom-wellness-back.herokuapp.com/withdrawBalance', json,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
                setBalance(0)

        })
            .catch(function (error) {
                alert("Error making withdrawl")
                console.log(error);
            })

        setIsOpen(false)
    }

    return(
        <>

            <div className={"card bg-light"} style={{paddingTop:'10px',paddingLeft:'5px',paddingRight:'5px'}}>

                <div className={"card-header bg-success"}> Your current earnings $ {balance} </div>
                <br/>

                <Button variant={"danger"} onClick={()=>setIsOpen(true)}> Withdraw </Button>

                <br/>

                <Modal  isOpen={modalIsOpen}
                        onRequestClose={()=>setIsOpen(false)}
                    style={customStyles}
                >
                    <>


                        <div className={"row"} >

                            <table>

                            <tr>
                                <td>
                                    <div className={"card-header bg-primary text-white"}> Account Number: </div>
                                </td>
                                <td>
                                     <TextField
                                         value={accountNumber}
                                        onChange={(e)=>setAccountNumber(e.target.value)}
                                     />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className={"card-header bg-primary text-white"}> Routing Number: </div>
                                </td>
                                <td>
                                    <TextField
                                    value={routingNumber}
                                    onChange={(e)=>setRoutingNumber(e.target.value)}
                                    />

                                </td>
                            </tr>



                                <tr>
                                    <td colSpan={"2"} style={{paddingTop:'10px'}}>
                                    <center>
                                        <Button variant={"success"} onClick={()=>{
                                            if(validateParameters()){
                                                withdraw()
                                            }
                                        }}> Submit </Button>
                                    </center>
                                    </td>
                                </tr>

                            </table>
                        </div>

                        <Button onClick={()=>setIsOpen(false)} variant={'danger'}> Close </Button>
                    </>
                </Modal>

            </div>

        </>
    )

}