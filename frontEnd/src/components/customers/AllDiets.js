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


                                    {selectedDiet.userIdsToExersizesSubscribed.includes(localStorage.getItem("email")) ?
                                        <>

                                            <Button onClick={()=>removeDietSubscription(selectedDiet._id)} style={{width:"120px"}} variant="danger" type={"button"}> Unsubscribe </Button>

                                        </>

                                        :
                                        <Button onClick={()=>subscribeDiet(selectedDiet._id)} style={{width:"100px"}} variant="success" type={"button"}> Subscribe </Button>
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