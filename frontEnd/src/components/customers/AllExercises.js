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
                    {selectedExercise.title}
                    <br/>
                    {selectedExercise.description}
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
