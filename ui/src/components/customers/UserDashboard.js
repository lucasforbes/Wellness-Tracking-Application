import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card,Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core/';
import {Link} from "react-router-dom";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

export default function UserDashboard(props){



    const [email,setEmail] = useState();
    const [isLoggedIn,setisLoggedIn] = useState(false);

    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });


    useEffect(()=>{
        if ( localStorage.getItem('email') )
        {
            setisLoggedIn(true)
            setEmail(localStorage.getItem('email'))
        }
    })


    return (
        <>

            <center>

                {!isLoggedIn ?  <>

                    <Card  bg={'Warning'.toLowerCase()} text={'light'} style={{width: '25rem'}}>

                        <Card.Body>
                            You are not logged in our your session has expired.
                                <br/>
                                <br/>

                            <Button variant="light" > <Link to={"/login"}>Login  </Link> </Button> {''}

                            <Button variant="light" > <Link to={"/signup"}> Signup </Link> </Button> {''}

                            </Card.Body>

                    </Card>


                        </>:

                    <div class='card' style={{alignItems: 'center'}}>


                        <Card bgstyle={{width: '18rem', border: 'none'}}>

                            User Dashboard

                            <button onClick={() => setState({ isPaneOpen: true })}>
                                Click me to open right pane!
                            </button>

                            <br/>

                        </Card>

                        <SlidingPane
                            className="some-custom-class"
                            overlayClassName="some-custom-overlay-class"
                            isOpen={state.isPaneOpen}
                            title="User Stats"
                            subtitle="Bio details"
                            onRequestClose={() => {
                                // triggered on "<" on left top click or on outside click
                                setState({ isPaneOpen: false });
                            }}
                        >
                            <div>Weight Height Sleep Etc </div>
                            <div> Or subscriptions shortcut</div>
                            <br />
                            
                        </SlidingPane>

                    </div>


                }
            </center>

        </>
    )


}
