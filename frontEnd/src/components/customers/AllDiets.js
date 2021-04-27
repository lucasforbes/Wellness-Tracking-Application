import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import {FcSearch} from  "react-icons/fc";
import Modal from 'react-modal';
import InputAdornment from '@material-ui/core/InputAdornment';
import DataTable from 'react-data-table-component';

import { makeStyles } from "@material-ui/core/styles";
import Rating from "react-rating";


export default function AllDiets(props){

    const useStyles = makeStyles((theme) => ({
        input: {
            background: 'white'
        }
    }));

    const [data,setData]= useState(props.data);

    const [paidFilter,setPaidFilter] = useState("all");

    const [selectedDiet,setSelectedDiet] = useState("");

    const [allCreators,setAllCreators] = useState();
    const [creatorSelected,setCreatorSelected] = useState("all");

    useEffect(()=>{


        axios.get('https://bloom-wellness-back.herokuapp.com/findAllCreators')
            .then((res)=>{
                setAllCreators(res.data)
            })
            .catch((err)=>{
                console.log("Error while fetching Creators",err)
            })

    },[])





    const handleAction = value => {
        openModal()
        setSelectedDiet(value)
        console.log("Value Selected",value);
    }

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            maxWidth: 100,
            minWidth: 20,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
            maxWidth: 100,
            minWidth: 20,
        },
        {
            name: 'By',
            selector: 'email',
            sortable: true,
            maxWidth: 100,
            minWidth: 20,
        },

    ];


    const customStylesModal = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    const customStyles = {

        header: {
            style: {
                color: 'white',
                backgroundColor: 'dodgerblue',
                fontWeight: '1000',
                fontSize: '180%',
                textDecoration: 'underline',
                borderRight: 'inset 5px white',
                borderLeft: 'solid 5px white',
                borderTop: 'inset 5px dodgerblue',

                minHeight: '72px', // override the row height
            }
        },

        rows: {
            style: {
                color: 'white',
                backgroundColor: 'lightGreen',

                minHeight: '72px', // override the row height
            }
        },
        headCells: {
            style: {
                color: 'dodgerblue',
                backgroundColor: 'lightBlue',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                borderBottom: 'inset 5px dodgerblue',
                fontSize: '110%',
                fontWeight: '550'
            },
        },
        cells: {
            style: {
                fontSize: '120%',
                color: 'dodgerblue',
                backgroundColor: 'lightGreen',
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };


    const filterPaid=(value)=>{


        if(value == "paid") {


            let temp= props.data.filter((exercise) => {
                return exercise.paid == true;
            })

            setData(temp)
        }

        if(value == "free"){
            let temp = props.data.filter((exercise) => {
                return exercise.paid == false;
            })

            setData(temp)
        }

        if(value == "all"){
            setData(props.data)
        }


    }



    console.log(data)

    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const subscribeDiet=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/subscribeDiet",{
            id: id,
            email: localStorage.getItem('email')
        }).
        then((res)=>{
            alert("Subscribed Successfully")
            props.callBack()
        })
            .catch((err)=>{
                alert("Error while subscribing")
                console.log(err);
            })
    }

    const  removeDietSubscription=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/removeDietSubscribe",{
            id: id,
            email: localStorage.getItem('email')
        }).
        then((res)=>{
            alert("UnSubscribed Successfully")
            props.callBack()
        })
            .catch((err)=>{
                alert("Error while unsubscribing")
                console.log(err);
            })
    }

    const [searchValue,setSearchValue] = useState("");

    const handleSearch=()=>{

        setPaidFilter("all")


        let tempData = props.data.filter((row)=>{
            return JSON.stringify(row).toLowerCase().includes(searchValue.toLowerCase())
        })

        setData(tempData)

    }

    const handleCreator=(value)=>{
        setPaidFilter("all")
        setSearchValue("")

        if(value == "all"){
            setData(props.data)
        }else{
            let tempData = props.data.filter((row)=>{
                return row.email==value
            })

            setData(tempData)

        }

    }

    const [modalPaidSub,setModalPaidSub] = useState(false);

    const [creditCardNumber,setCreditCardNumber] = useState("");
    const [cvv,setCVV] = useState("");
    const [cardDate,setCardDate] = useState(new Date().toISOString().split("T")[0]);

    const PaidsubscribeWorkout=(id)=>{

        let url = "https://bloom-wellness-back.herokuapp.com/subscribeUserToPaidDiet/?dietId="+id+"&userEmail="+localStorage.getItem('email')

        console.log("url1",url)

        axios.get(url,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res)=>{

                if(res.data == "Added user to Exersize subscriber list"){
                    alert("Successfully added")
                    props.callBack()
                }
                if(res.data == "Need Payment"){
                    setModalPaidSub(true)
                }

            })
            .catch((err)=>{
                alert("Error while subscribing")
                console.log(err);
            })
    }


    const validateCard =()=>{

        var numbers = /^[0-9]+$/;

        if(creditCardNumber != "" && creditCardNumber.length == 16 && creditCardNumber.match(numbers)){

        }else{
            alert("Invalid Credit Card Number")
            return false
        }

        if(cvv != "" && cvv.length == 3 && cvv.match(numbers)){

        }else{
            alert("Invalid CVV")
            return false

        }

        if(new Date(cardDate)  >= new Date()){

        }else{
            alert("Card has expired")
            return false
        }

        return true
    }

    const submitCard=()=>{

        let json = JSON.stringify({
            'userEmail':localStorage.getItem('email'),
            'obj': selectedDiet._id,
            'payment': {
                'cardNumber': creditCardNumber,
                'cvv': cvv,
                'date': cardDate
            }
        })

        axios.post('https://bloom-wellness-back.herokuapp.com/makePayment',json,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res)=>{

                if(res.data == "Payment Processed, Subscription Added"){
                    alert("Successfully added")
                    props.callBack()
                }else{
                    alert(res.data)
                }

            })
            .catch((err)=>{
                alert("Error while subscribing")
                console.log(err);
            })
    }




    return(

        <>
            <div className={'container-fluid'} style={{color: 'white', backgroundColor:'lightgreen',fontFamily: 'cursive'}}>


                <FormControl >
                    <InputLabel> Cost </InputLabel>
                    <Select onChange={filterPaid} value={paidFilter} onChange={(e)=> {
                        setPaidFilter(e.target.value)
                        filterPaid(e.target.value)
                    }}>
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"paid"}> Paid </MenuItem>
                        <MenuItem value={"free"}>Free </MenuItem>
                    </Select>
                </FormControl>

                {" "}
                <FormControl >
                    <InputLabel> Creator </InputLabel>
                    <Select  style={{minWidth:'150px'}} value={creatorSelected} onChange={(e)=> {
                        setCreatorSelected(e.target.value)
                        handleCreator(e.target.value)
                    }}>
                        <option value={"all"}>All</option>
                        {allCreators && allCreators.length > 0 ? allCreators.map((creator,index)=>{
                           return ( <option id={index} value={creator.email}> {creator.email}</option>)
                        }):""}

                    </Select>
                </FormControl>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStylesModal}
                >


                    <div style={{overflowY:'scroll',height:'400px'}}>



                    <h2 >Diet Details </h2>


                    {selectedDiet?
                        <>

                            <div className={"row"}>

                                <div className={"col-md-2"} style={{paddingBottom:'10px'}}>
                                    {selectedDiet.file ? <a href={'https://bloom-flask-app.herokuapp.com/file/'+selectedDiet.file}  target={"_blank"}> <img  style={{maxWidth:'200px',maxHeight:'200px'}} src={'https://bloom-flask-app.herokuapp.com/file/'+selectedDiet.file} alt={"No image"}/> </a>:
                                        <img style={{maxWidth:'200px',maxHeight:'200px',paddingRight:'20px'}} src={process.env.PUBLIC_URL + 'diet1.jpg'} alt={"No image"}/>}

                                </div>

                                <div className={"col-md-4"} style={{paddingBottom:'10px'}}>
                                    <div style={{float:'right'}}>
                                        <h4>  {selectedDiet.title} </h4>
                                        <b> Description: </b>    {" "+selectedDiet.description}

                                        <br/>
                                        Ratings: {" "}
                                        <Rating initialRating={selectedDiet.AvgRatings?selectedDiet.AvgRatings:0}
                                                readonly
                                                emptySymbol={<img style={{width:'20px',height:'20px'}}  src={process.env.PUBLIC_URL+'starempty.jpg'} className="icon" />}
                                                fullSymbol={<img style={{width:'20px',height:'20px'}} src={process.env.PUBLIC_URL+'starfull.jpg'} className="icon" />}/>

                                        <br/>

                                        Comments: {" "}

                                        <div style={{overflowY:'scroll',height:'60px'}}>
                                            {selectedDiet.comments && selectedDiet.comments.length > 0 ?
                                                selectedDiet.comments.map((comment,index)=>{
                                                    return(
                                                        <div id={index}>
                                                            <div style={{width:'100%',height:'3px',backgroundColor:'blue'}}>

                                                            </div>
                                                            {comment}
                                                        </div>
                                                    )
                                                })

                                                :
                                                ""
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className={"col-md-6"}>


                                    {/*{selectedDiet.userIdsToExersizesSubscribed.includes(localStorage.getItem("email")) ?*/}
                                    {/*    <>*/}

                                    {/*        <Button onClick={()=>removeDietSubscription(selectedDiet._id)} style={{width:"120px"}} variant="danger" type={"button"}> Unsubscribe </Button>*/}

                                    {/*    </>*/}

                                    {/*    :*/}
                                    {/*    <Button onClick={()=>subscribeDiet(selectedDiet._id)} style={{width:"100px"}} variant="success" type={"button"}> Subscribe </Button>*/}
                                    {/*}*/}

                                    {selectedDiet.userIdsToExersizesSubscribed.includes(localStorage.getItem("email")) ?
                                        <>
                                            <Button onClick={()=>removeDietSubscription(selectedDiet._id)} style={{width:"120px"}} variant="danger" type={"button"}> Unsubscribe </Button>
                                        </>

                                        :
                                        <>
                                            {/*{selectedDiet.paid?*/}
                                            {/*    <Button onClick={() => PaidsubscribeWorkout(selectedDiet._id)}*/}
                                            {/*            style={{minWidth: "140px"}} variant="success"*/}
                                            {/*            type={"button"}> Paid Subscribe </Button>*/}
                                            {/*    :*/}
                                            {/*    <Button onClick={() => subscribeDiet(selectedDiet._id)}*/}
                                            {/*            style={{width: "100px"}} variant="success"*/}
                                            {/*            type={"button"}> Subscribe </Button>*/}
                                            {/*}*/}

                                            <Button onClick={() => subscribeDiet(selectedDiet._id)}
                                                    style={{width: "100px"}} variant="success"
                                                    type={"button"}> Subscribe </Button>

                                        </>
                                    }

                                </div>



                                {selectedDiet.dietList && selectedDiet.dietList.length > 0 ?

                                    selectedDiet.dietList.map((dietItem,id)=>{
                                        return (

                                            <div className={"col-md-6"}>
                                                <div className={"text-white bg-info "} style={{paddingLeft:'25px',paddingTop:'5px',paddingRight:'5px'}}>

                                                    <i>Item: </i> {dietItem.item}
                                                    <p>Serving Size {" "+dietItem.servingSize+" "}</p>
                                                    <p> Fat Contains {" "+dietItem.fat+" "} </p>
                                                    <p> Carbs Contains {" "+dietItem.carbs+" "}</p>
                                                    <p> Total Calories {" "+dietItem.calories+" "}</p>
                                                    <p> Protein Contains {" "+dietItem.protein+" "}</p>
                                                </div>

                                            </div>
                                        )
                                    }):""
                                }


                                <br/>


                            </div>

                            <Modal  isOpen={modalPaidSub}
                                    onRequestClose={()=>setModalPaidSub(false)}
                                    style={customStylesModal}
                            >


                                <div className={"card text-white bg-primary"}>
                                    <div className={"card-header"}> Enter Credit Card Details </div>
                                    <div className={"card-body"}>


                                        <div className="row">
                                            <div className="col-md-5">
                                                <h3>Billing Address</h3>
                                                <table style={{paddingLeft:'10px',paddingRight:'10px'}}>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="fname" name="firstname" placeholder="John M. Doe" />
                                                        </td>
                                                        <td>
                                                            <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>

                                                        </td>
                                                        <td>
                                                            <input type="text" id="email" name="email"
                                                                   placeholder="john@example.com" />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <label htmlFor="adr"><i
                                                                className="fa fa-address-card-o"></i> Address</label>
                                                        </td>

                                                        <td colSpan={"3"}>
                                                            <input type="text" id="adr" name="address"
                                                                   placeholder="542 W. 15th Street"  style={{width:'100%'}}/>
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="city" name="city" placeholder="New York"/>
                                                        </td>
                                                        <td>
                                                            <label htmlFor="state">State</label>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="state" name="state"
                                                                   placeholder="NY"/>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <label htmlFor="zip">Zip</label>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="zip" name="zip"
                                                                   placeholder="10001"/>
                                                        </td>
                                                    </tr>


                                                </table>


                                            </div>

                                            <div className={"col-md-1"}>

                                            </div>
                                            <div className={"col-md-6"}>
                                                <h3>Payment</h3>
                                                <label htmlFor="fname">Accepted Cards</label>
                                                <div>
                                                    <img src={process.env.PUBLIC_URL + 'cards.jpg'} style={{height:'30px',width:'140px'}} alt={"Visa"}/>
                                                </div>

                                                <table>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="cname">Name on Card</label>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={"2"}>
                                                            <TextField style={{backgroundColor:'white',  width:'400px'}} placeholder={"Credit Card Number"}
                                                                       value={creditCardNumber}
                                                                       onChange={(e)=>{
                                                                           setCreditCardNumber(e.target.value)
                                                                       }}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <TextField style={{backgroundColor:'white'}} placeholder={"CVV"}
                                                                       value={cvv}
                                                                       onChange={(e)=>{
                                                                           setCVV(e.target.value)
                                                                       }}
                                                            > </TextField>
                                                        </td>
                                                        <td>
                                                            <TextField style={{backgroundColor:'white'}} type={"date"}
                                                                       placeholder={"Credit Card Number"} value={cardDate} onChange={(e)=>setCardDate(e.target.value)}></TextField>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Button variant={"success"} type={"button"} onClick={()=>{
                                                                if(validateCard()) {
                                                                    submitCard()
                                                                }
                                                            }}> Submit </Button>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </div>


                                        </div>

                                        <br/>

                                        <div className={"card-header bg-danger text-white"}> You will be charged $2.00 </div>

                                    </div>
                                </div>




                            </Modal>

                        </>
                        :
                        ""
                    }

                    <Button variant="danger" onClick={closeModal}>close</Button>

                </div>

                </Modal>

                {" "}



                 <TextField

                        placeholder={'Search by Creator, Contain'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FcSearch style={{background:'white'}}/>
                                </InputAdornment>
                            ),
                        }}
                        value={searchValue}
                        onChange={(e)=>{
                            setSearchValue(e.target.value)
                            handleSearch()
                        }}
                        style={{background: 'white',width:'300px',marginTop:'10px'}}

                 />

                <br/>

<br/>
                <DataTable

                    title="Diet List"
                    columns={columns}
                    style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive',color:'white',rowHeight:'200px'}}
                    customStyles={customStyles}
                    data={data}
                    theme="info"
                    pagination={true}
                    onRowClicked={handleAction}
                />
            </div>
            <br/>

        </>
    )

}