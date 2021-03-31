import React from "react";
import {
    Card,
    Container,
    Row,
    Col, CardImg
} from 'react-bootstrap';

export default function AboutUs(){
    return(
        <>
            <div className={'row'} style={{height: '100vh', width:'100vw', overflow: 'hidden', backgroundImage: 'url(Bloom Wellness White Background.jpg)'}}  >

            </div>
            <div className={'row'}>


                <div className={'col-md-6'}>
                    <div className={'header'} style={{marginRight: 'auto', marginLeft: 'auto'}}> meet the team </div>
                    <div className={'row'}>
                        <div className={'col-xs-6'}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{}} variant="top" src="austin.jpg"/>
                                Austin


                            </Card>
                        </div>
                        <div className={'col-xs-6'}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '50%'}} variant="top" src="feifan (2).jpg"/>
                                Feifan
                            </Card>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className={'col-xs-6'}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '70%'}} variant="top" src="vishal.jpg"/>
                                Vishal
                            </Card>
                        </div>
                        <div className={'col-xs-6'}>
                            <Card style={{width: '20vw'}}>
                                <Card.Img style={{height: '70%'}} variant="top" src="lucas.png"/>
                                Lucas
                            </Card>
                        </div>
                    </div>

                </div>
            </div>



        </>
    )
}