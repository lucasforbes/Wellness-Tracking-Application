import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import {TextField,Select,MenuItem,InputLabel, FormControl} from '@material-ui/core/';
import {Link} from "react-router-dom";
import Modal from 'react-modal';

import DataTable from 'react-data-table-component';



export default function AllExercises(props){

    const [data,setData]= useState(props.data);

    const [paidFilter,setPaidFilter] = useState("all");

    const [selectedExercise,setSelectedExercise] = useState("");

    useEffect(()=>{

    },[])



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


    const filterPaid=(value)=>{


        if(value == "paid") {


            let temp= props.data.filter((exercise) => {
                return exercise.type;
            })

            setData(temp)
        }

        if(value == "free"){
            let temp = props.data.filter((exercise) => {
                return !exercise.type;
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

    const  removeSubscription=(id)=>{
        axios.post("https://bloom-flask-app.herokuapp.com/removeSubscribe",{
            id: id,
            email: localStorage.getItem('email')
        }).
        then((res)=>{
            alert("UnSubscribed Successfully")
            // props.callBack()
        })
            .catch((err)=>{
                alert("Error while unsubscribing")
                console.log(err);
            })
    }


    return(

        <>

            <FormControl>
                <InputLabel> Type </InputLabel>
                <Select onChange={filterPaid} value={paidFilter} onChange={(e)=> {
                    setPaidFilter(e.target.value)
                    filterPaid(e.target.value)
                }}>
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"paid"}> Paid </MenuItem>
                    <MenuItem value={"free"}>Free </MenuItem>
                </Select>
            </FormControl>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <Button variant="danger" onClick={closeModal}>close</Button>

                <h2>Workout Details </h2>

                {selectedExercise?
                    <>

                        <div className={"row"}>
                            <div className={"col-md-5"}>
                                <h4>  {selectedExercise.title} </h4>
                            </div>

                            <div className={"col-md-1"}>

                                {console.log("Array",selectedExercise.userIdsToExersizesSubscribed)}

                                {selectedExercise.userIdsToExersizesSubscribed.includes(localStorage.getItem("email")) ?
                                    <>"Already Subscribed"

                                        <Button onClick={()=>removeSubscription(selectedExercise._id)} style={{width:"100px"}} variant="danger" type={"button"}> Unsubscribe </Button>

                                    </>

                                    :
                                    <Button onClick={()=>subscribeWorkout(selectedExercise._id)} style={{width:"100px"}} variant="success" type={"button"}> Subscribe </Button>
                                }

                            </div>


                            <div className={"col-md-8"}>
                                <b> Description: </b>    {" "+selectedExercise.description}
                            </div>

                            {selectedExercise.activityList && selectedExercise.activityList.length > 0 ?

                                selectedExercise.activityList.map((item,id)=>{
                                    return (
                                        <>

                                            <div className={"col-md-5"}>

                                                <i>Activity: </i> {item.activityName} <br/>
                                                {"Description: " +item.activityDescription + "  Total Duration: "+item.totalDuration} <br/>
                                                {"Sets: "+item.activitySets +" "+ "Reps:  "+item.activityReps} <br/>
                                                {"Body Parts Targeted: "+item.bodyPartsTargeted+" Tools: "+item.equipmentNeeded} <br/>

                                                {"videoLink :"}< a href={item.videoLink?item.videoLink:""} > here</a>

                                            </div>
                                        </>
                                    )
                                }):""
                            }


                            <br/>



                        </div>

                    </>
                    :
                    ""
                }


            </Modal>

            <DataTable
                title="Workout List"
                columns={columns}
                data={data}
                theme="solarized"
                pagination={true}
                onRowClicked={handleAction}
            />

        </>
    )

}