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
            <div className={'row'} style={{height: '100vh', width:'100vw', overflow: 'hidden'}}  >

                <div className={'col-md-6'}>
                    <Card style = {{marginLeft: 'auto', marginRight:'auto' ,width: '80%', height:'80%', minHeight:'0'}} className="bg-dark text-white">
                        <Card.Img variant={'top'} src="Bloom Wellness White Background.jpg" alt="Card image" />
                        <Card.ImgOverlay style = {{width: '100%'}}>


                        </Card.ImgOverlay>
                    </Card>

                </div>

                <div className={'col-md-6'}>
                    <div className={'header'} style={{fontFamily: 'url(Mont-HeavyDEMO.otf)' , textAlign: 'center', fontSize: '200%'}}> Meet the Team </div>

                    <div className={'row'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                        <div className={'col-xs-6'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{}} variant="top" src="austin.jpg"/>
                                Austin


                            </Card>
                        </div>
                        <div className={'col-xs-6'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '50%'}} variant="top" src="feifan (2).jpg"/>
                                Feifan
                            </Card>
                        </div>
                    </div>

                    <div className={'row'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                        <div className={'col-xs-6'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '70%'}} variant="top" src="vishal.jpg"/>
                                Vishal
                            </Card>
                        </div>
                        <div className={'col-xs-6'} style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '70%'}} variant="top" src="lucas.png"/>
                                Lucas
                            </Card>
                        </div>
                    </div>

                </div>






            </div>


            <div className={'row'}>



            </div>



        </>
    )
}