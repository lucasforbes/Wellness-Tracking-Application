import React from "react";
import {
    Card,
    Container,
    Row,
    Col, CardImg
} from 'react-bootstrap';
import Login from "./registeration/login";

export default function AboutUs(){
    return(
        <>
            <div className={'row'} style={{height: '60vh', width:'100vw', overflow: 'hidden', backgroundColor: 'lightblue'}}  >

                <div className={'col-md-6'}>
                    <Card style = {{marginLeft: '2vw',marginRight: '2vw',marginTop: '10vh',borderBottom: '5px groove dodgerblue',borderTop: '5px solid white', borderLeft: '5px inset lightgreen', borderRight: '5px inset lightgreen'}} className="bg-dark text-white">
                        <Card.Img style={{backgroundColor:'lightBlue'}} variant={'bottom'} src="Bloom Wellness White Transparent.png" alt="Card image" />
                        <Card.ImgOverlay style = {{}}>


                        </Card.ImgOverlay>
                    </Card>


                </div>




                <div className={'col-md-6'}>
                    <div className={'header'} style={{marginTop: '3vh', fontFamily: 'Cursive' , textAlign: 'center', fontSize: '200%', color: 'white'}}> Meet the Team </div>

                    <div className={'row'} style={{padding: '10px',marginRight: 'auto', marginLeft: 'auto'}}>
                        <div className={'col-sm-6'} style={{}}>
                            <Card style={{height: '100%',fontSize:'2vw',textAlign: 'center',backgroundColor:'lightGreen', color: 'white', fontFamily:'cursive',width: '20vw',  borderBottom: '5px groove dodgerblue',borderTop: '5px solid white', borderLeft: '5px groove lightgreen', borderRight: '5px groove lightgreen'}}>
                                <Card.Img style={{height: '100%'}} variant="top" src="austin.jpg"/>

                                <Card.ImgOverlay style = {{}}>
                                    <header style={{position:'absolute', bottom:'0px'}}> Austin</header>



                                </Card.ImgOverlay>


                            </Card>
                        </div>
                        <div className={'col-sm-6'} style={{padding:'10px',  marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{marginTop: '-9px',height: '107%', fontSize:'2vw',textAlign: 'center',backgroundColor:'lightGreen', color: 'white', fontFamily:'cursive', width: '20vw', borderBottom: '5px groove dodgerblue',borderTop: '5px solid white', borderLeft: '5px groove lightgreen', borderRight: '5px groove lightgreen'}}>
                                <Card.Img style={{height: '100%'}} variant="top" src="feifan (2).jpg"/>

                                <Card.ImgOverlay style = {{}}>
                                    <header style={{position:'absolute', bottom:'0px'}}> Feifan</header>



                                </Card.ImgOverlay>

                            </Card>
                        </div>
                    </div>

                    <div className={'row'} style={{padding: '10px', marginRight: 'auto', marginLeft: 'auto'}}>
                        <div className={'col-sm-6'} style={{padding:'10px',  marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{marginTop: '-9px',height: '107%', fontSize:'2vw',textAlign: 'center',backgroundColor:'lightGreen', color: 'white', fontFamily:'cursive', width: '20vw', borderBottom: '5px groove dodgerblue',borderTop: '5px solid white', borderLeft: '5px groove lightgreen', borderRight: '5px groove lightgreen'}}>
                                <Card.Img style={{height: '100%'}} variant="top" src="vishal.jpg"/>

                                <Card.ImgOverlay style = {{}}>
                                    <header style={{position:'absolute', bottom:'0px'}}> Vishal</header>



                                </Card.ImgOverlay>

                            </Card>
                        </div>

                        <div className={'col-sm-6'} style={{padding:'10px',  marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{marginTop: '-9px',height: '107%', fontSize:'2vw',textAlign: 'center',backgroundColor:'lightGreen', color: 'white', fontFamily:'cursive', width: '20vw', borderBottom: '5px groove dodgerblue',borderTop: '5px solid white', borderLeft: '5px groove lightgreen', borderRight: '5px groove lightgreen'}}>
                                <Card.Img style={{height: '100%'}} variant="top" src="lucas.png"/>

                                <Card.ImgOverlay style = {{}}>
                                    <header style={{position:'absolute', bottom:'0px'}}> Lucas</header>



                                </Card.ImgOverlay>

                            </Card>
                        </div>
                    </div>


                </div>




            </div>

            <div className={'row'} style={{backgroundColor: 'lightblue', height: '31.5vh'}}>

                <text  style={{backgroundColor: 'lightblue',fontFamily: 'cursive', position: 'relative', right: '-20vw', color: 'white', fontSize: '3vw'}}>
                    Here at bloom wellness we love being well
                </text>


            </div>



            <div className={'row'}>



            </div>



        </>
    )
}