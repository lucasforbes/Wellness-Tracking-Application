import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import Modal from 'react-modal';

import DataTable from 'react-data-table-component';
import InputAdornment from "@material-ui/core/InputAdornment";
import {FcSearch} from "react-icons/fc";



export default function AllExercises(props){

    const [data,setData]= useState(props.data);

    const [paidFilter,setPaidFilter] = useState("all");

    const [selectedExercise,setSelectedExercise] = useState("");

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

    const handleAction = value => {
        openModal()
        setSelectedExercise(value)
        console.log("Value Selected",value);
    }

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
        },
        {
            name: 'By',
            selector: 'email',
            sortable: true,
        },

    ];

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

    const subscribeWorkout=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/subscribe",{
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


    const [modalIsOpenPaid,setIsOpenPaid] = React.useState(false);


    const [modalPaidSub,setModalPaidSub] = useState(false);

    const [creditCardNumber,setCreditCardNumber] = useState("");
    const [cvv,setCVV] = useState("");
    const [cardDate,setCardDate] = useState(new Date().toISOString().split("T")[0]);

    const PaidsubscribeWorkout=(id)=>{

        let url = "https://bloom-wellness-back.herokuapp.com/subscribeUserToPaidExersize/?exersizeId="+id+"&userEmail="+localStorage.getItem('email')

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
          'obj': selectedExercise._id,
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


    const  removeSubscription=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/removeSubscribe",{
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



    return(

        <>

            <div className={'container-fluid'} style={{color: 'white', backgroundColor:'lightgreen',fontFamily: 'cursive'}}>


                <FormControl >
                    <InputLabel> Type </InputLabel>
                    <Select  value={paidFilter} onChange={(e)=> {
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
                    isOpen={modalIsOpenPaid}
                    onRequestClose={()=>setIsOpenPaid(false)}
                >

                    <Button variant="danger" onClick={closeModal}>close</Button>

                    <h2 > Credit Card Detials:</h2>


                </Modal>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStylesModal}
                >

                <div style={{overflowY:'scroll',height:'400px'}}>


                    <h2 >Workout Details </h2>

                    {selectedExercise?
                        <>

                            <div className={"row"} >

                                <div className={"col-md-2"}>
                                    {selectedExercise.file ? <a href={'https://bloom-flask-app.herokuapp.com/file/'+selectedExercise.file}  target={"_blank"}> <img  style={{maxWidth:'600px',maxHeight:'800px'}} src={'https://bloom-flask-app.herokuapp.com/file/'+selectedExercise.file} alt={"No image"}/> </a>:
                                        <img style={{maxWidth:'600px',maxHeight:'800px'}} src={process.env.PUBLIC_URL + 'exe1.jpg'} alt={"No image"}/>}

                                </div>

                                <div className={"col-md-4"}>
                                    <div style={{float:'right'}}>
                                        <h4>  {selectedExercise.title} </h4>
                                        <b> Description: </b>    {" "+selectedExercise.description}
                                    </div>
                                </div>

                                <div className={"col-md-6"}>



                                    {selectedExercise.userIdsToExersizesSubscribed.includes(localStorage.getItem("email")) ?
                                        <>
                                            <Button onClick={()=>removeSubscription(selectedExercise._id)} style={{width:"120px"}} variant="danger" type={"button"}> Unsubscribe </Button>
                                        </>

                                        :
                                        <>
                                            {selectedExercise.paid?
                                                <Button onClick={() => PaidsubscribeWorkout(selectedExercise._id)}
                                                        style={{minWidth: "140px"}} variant="success"
                                                        type={"button"}> Paid Subscribe </Button>
                                                :
                                                <Button onClick={() => subscribeWorkout(selectedExercise._id)}
                                                        style={{width: "100px"}} variant="success"
                                                        type={"button"}> Subscribe </Button>
                                            }
                                        </>
                                    }
                                </div>




                                {selectedExercise['paid'] == false ||  selectedExercise.userIdsToExersizesSubscribed.includes(localStorage.getItem('email')) ?

                                    selectedExercise.activityList.map((item,index)=>{
                                        return (


                                                <div className={"col-md-6 card bg-transparent"} id={index}>

                                                    <i>Activity: </i> {item.activityName} <br/>
                                                    {"Description: " +item.activityDescription + "  Total Duration: "+item.totalDuration} <br/>
                                                    {"Sets: "+item.activitySets +" "+ "Reps:  "+item.activityReps} <br/>
                                                    {"Body Parts Targeted: "+item.bodyPartsTargeted+" Tools: "+item.equipmentNeeded} <br/>

                                                    {"videoLink :"}< a href={item.videoLink?item.videoLink:""} > here</a>

                                                </div>

                                        )
                                    }):

                                        <div className={"col-md-12"}>

                                            {selectedExercise['paid'] ?

                                                <div className={"card-header text-white bg-success"}>
                                                    Subscribe to view the content
                                                </div>
                                                :""
                                            }
                                        </div>



                                }



                                <br/>



                            </div>

                        </>
                        :
                        ""
                    }

                    <div style={{paddingTop:'10px',paddingBottom:'10px'}}>
                        <Button variant="danger" onClick={closeModal}>close</Button>
                    </div>

                    </div>
                </Modal>


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
                    title="Workout List"
                    columns={columns}
                    style={{backgroundColor: 'lightgreen', border: 'solid', borderColor: 'white', fontFamily: 'Cursive',color:'white'}}
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