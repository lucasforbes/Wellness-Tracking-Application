import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function navigation(props){

    return (

        <>

            <div style={{float:'right',paddingTop:'5px',width:'100%',paddingBottom:'10px'}}>
                <Button variant="outline-primary"> <Link to={"/"} > Home </Link></Button>{' '}

                <Button variant="outline-primary" > <Link to={"/login"}> Login </Link> </Button> {''}

                <Button variant="outline-primary" > <Link to={"/signup"}> Signup </Link> </Button> {''}


                <Button variant="outline-primary"> <Link to={"/about"}> About </Link> </Button> {''}

                <Button variant="outline-primary" onClick={()=>{

                    alert("Logged out")
                    setTimeout(function(){
                        localStorage.removeItem('email');
                        window.open('/');

                    }, 2000);

                }}>  Logout </Button> {''}



            </div>

        </>
    )


}
