import React,{useState,useEffect,useMemo} from "react";
import axios from "axios";
import { Chart } from 'react-charts'
import {InputLabel, TextField, FormControl} from "@material-ui/core";
import { CSVLink, CSVDownload } from "react-csv";
import {BiDownload} from "react-icons/bi";
export default function Statistics(){


   const [dataCaloriesIntake,setDataCaloriesIntake] = useState();
   const [axesCaloriesIntake,setAxesCaloriesIntake] = useState();
   const [axesCaloriesOptions,setCaloriesOptions] = useState();


   const [todaysData,setTodaysData] = useState();

   const [ yoga,setYoga] = useState(0);
   const [ cardio, setCardio] = useState(0);
   const [bodyBuilding,setBodyBuilding] = useState(0);
   const [caloriesForm,setCaloriesForm] = useState(0);
   const [caloriesBurnedForm,setCaloriesBurnedForm] = useState(0);


    const [refetchStatistics, setRefetchStatistics] = useState(true);


    const [csvData,setCSVData] = useState([]);


    useEffect(()=>{

        axios.get('https://bloom-wellness-back.herokuapp.com/statistic/getlatestweek?email='+localStorage.getItem('email'),{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("bodyInfo",response.data);

                    let tempCaloriesBurned = []

                    let tempCalories = []

                    for(let i=0;i<response.data.length;i++){
                       tempCalories.push({x:i+1,y:response.data[i]['caloriesIntake']})
                        tempCaloriesBurned.push({x:i+1,y:response.data[i]['caloriesBurned']})
                    }

                        console.log("tempWeightData",tempCalories)
                        setDataCaloriesIntake([
                            {
                                label: 'Calories Intake',
                                data: tempCalories
                            },{
                             label: 'Calories Burned',
                             data: tempCaloriesBurned
                         }
                        ])

                         setAxesCaloriesIntake(  [
                                { primary: true, type: 'linear', position: 'bottom' },
                                { type: 'linear', position: 'left' },
                            ])



                })

        .catch(function (error) {
            console.log(error);
        })



     axios.get('https://bloom-wellness-back.herokuapp.com/statistic/getlatest?email='+localStorage.getItem('email'),{
         headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*'
         }
         })
         .then((res)=>{
             console.log("Latest",res.data)

             if(res.data['date'] == new Date().toISOString().split("T")[0]){
                setTodaysData({
                    "yoga": res.data['yoga'],
                    "cardio": res.data['cardio'],
                    "bodyBuilding": res.data['bodyBuilding'],
                    "caloriesBurned": res.data['caloriesBurned'],
                    "caloriesIntake": res.data['caloriesIntake']
                })
             }else{
                 setTodaysData({
                     "yoga": 0,
                     "cardio": 0,
                     "bodyBuilding": 0,
                     "caloriesBurned": 0,
                     "caloriesIntake": 0
                 })
             }

         })
         .catch((err)=>{
             console.log("Error",err)
         })


        axios.get('https://bloom-wellness-back.herokuapp.com/statistic/find?email='+localStorage.getItem('email'),{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res)=> {
                console.log("All Data ", res.data)

                let tempCsvData = [["date","yoga","cardio","bodyBuilding","caloriesBurned","caloriesIntake"]]

                for(let i =0;i < res.data.length; i++){
                    tempCsvData.push([res.data[i]['date'],res.data[i]['yoga'],res.data[i]['cardio'],res.data[i]['bodyBuilding'],res.data[i]['caloriesBurned'],res.data[i]['caloriesIntake']])
                }

                setCSVData(tempCsvData)

            })
            .catch((err)=>{
                console.log(err)
            })



    },[refetchStatistics])


    const submitActivity=(e)=>{

        e.preventDefault()

        let json = JSON.stringify({
            'email': localStorage.getItem('email'),
            'date': new Date(),
            'yoga': yoga,
            'cardio': cardio,
            'bodyBuilding': bodyBuilding,
            'caloriesBurned': caloriesBurnedForm,
            'caloriesIntake': caloriesForm
        })

                axios.post('https://bloom-wellness-back.herokuapp.com/statistic/save?email='+localStorage.getItem('email'),json,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then((res)=>{
                    console.log("adding Activity",res)
                    alert("Activity Added")
                    setCaloriesForm(0)
                    setCaloriesBurnedForm(0)
                    setCardio(0)
                    setYoga(0)
                    setBodyBuilding(0)
                    setRefetchStatistics(!refetchStatistics)
                })
                .catch((err)=>{
                    alert("Error while adding activity")
                    console.log("Error Saving Activity",err)
                })


    }


    const deleteAllStats=()=>{
        axios.get('https://bloom-wellness-back.herokuapp.com/statistic/remove?email='+localStorage.getItem('email'),{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res)=> {
                console.log("Deleted", res.data)
                setRefetchStatistics(!refetchStatistics)
            })
            .catch((err)=>{
                alert("Error while deleting statistics")
                console.log(err)
            })
    }

    return(
        <>
            <center>

                <div className={"row"} style={{paddingLeft:"20px",paddingTop:"10px"}}>

                    <div className={"card col-md-6"}>

                        <div>



                            <div className={"card-body"}>

                               <div className={"card-header"} style={{paddingTop:'10px',paddingLeft:'10px'}}> Todays Data: </div>

                                {todaysData ?
                                    <table>

                                        <tr>

                                            <td>
                                                <center>
                                                <img src={process.env.PUBLIC_URL + '/yogaLabel.jpg'}
                                                     style={{height: '80px', width: '80px', borderRadius: '80px'}}/>
                                                </center>
                                            </td>

                                            <td>
                                                <center>
                                                <img src={process.env.PUBLIC_URL + '/cardioLogo.jpg'}
                                                     style={{height: '80px', width: '80px', borderRadius: '80px'}}/>
                                                </center>
                                            </td>

                                            <td>
                                                <center>
                                                <img src={process.env.PUBLIC_URL + '/bodyBuilding.PNG'}
                                                     style={{height: '80px', width: '80px', borderRadius: '80px'}}/>
                                                </center>
                                            </td>

                                            <td>
                                                <center>
                                                <img src={process.env.PUBLIC_URL + '/caloriesBurned.png'}
                                                     style={{height: '80px', width: '80px', borderRadius: '80px'}}/>
                                                </center>
                                            </td>

                                            <td>
                                                <center>
                                                <img src={process.env.PUBLIC_URL + '/caloriesIntake.jpg'}
                                                     style={{height: '80px', width: '80px', borderRadius: '80px'}}/>
                                                </center>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                <center>
                                                <div className={"card-header text-white bg-info"} style={{borderRadius:'30px'}}> {todaysData?todaysData.yoga:""} minutes</div>
                                                </center>
                                            </td>


                                            <td>
                                                <div className={"card-header text-white bg-warning"} style={{borderRadius:'30px'}}> {todaysData?todaysData.cardio:""} minutes </div>
                                            </td>

                                            <td>
                                                <div className={"card-header text-white bg-info"} style={{borderRadius:'30px'}}> {todaysData?todaysData.bodyBuilding:""} minutes</div>
                                            </td>


                                            <td>
                                                <div className={"card-header text-white bg-warning"} style={{borderRadius:'30px'}}> {todaysData?todaysData.caloriesBurned:""} kCal</div>
                                            </td>

                                            <td>
                                                <div className={"card-header text-white bg-info"} style={{borderRadius:'30px'}}> {todaysData?todaysData.caloriesIntake:""} kCal</div>
                                            </td>

                                        </tr>


                                    </table> : ""
                                }

                                <br/>
                                <br/>

                                <div className={"card-header text-white bg-primary"}>  Add New Activity </div>

                                <form>


                                <div className={"row"} style={{paddingTop:'5px',paddingLeft:'10px'}}>
                                    <div className={"col-md-2"}>


                                    <InputLabel className={"card-header text-white bg-danger"} style={{height:'30px',paddingTop:'5px'}}> Yoga</InputLabel>

                                    </div>

                                    <div className={"col-md-2"}>
                                        <TextField
                                        value={yoga}
                                        onChange={(e)=>setYoga(e.target.value)}
                                        placeholder={"minutes..."}
                                        name={"yoga"}
                                        />
                                    </div>

                                    <div className={"col-md-2"}>

                                        <InputLabel className={"card-header text-white bg-info"} style={{height:'30px',paddingTop:'5px'}}> Cardio </InputLabel>

                                    </div>

                                    <div className={"col-md-2"}>


                                    <TextField
                                        value={cardio}
                                        onChange={(e)=>setCardio(e.target.value)}
                                        placeholder={"minutes..."}
                                        name={"Cardio"}
                                    />

                                    </div>

                                    <div className={"col-md-2"}>

                                        <InputLabel className={"card-header text-white bg-danger"} style={{height:'50px',paddingTop:'5px'}}> Body Building </InputLabel>

                                    </div>

                                    <div className={"col-md-2"}>

                                    <TextField
                                        value={bodyBuilding}
                                        onChange={(e)=>setBodyBuilding(e.target.value)}
                                        placeholder={"minutes..."}
                                        name={"BodyBuilding"}
                                    />
                                    </div>

                                    <div className={"col-md-2"}>

                                        <InputLabel className={"card-header text-white bg-info"} style={{height:'50px',paddingTop:'5px'}}> Calories Burned </InputLabel>

                                    </div>

                                    <div className={"col-md-2"}>
                                    <TextField
                                        value={caloriesBurnedForm}
                                        onChange={(e)=>setCaloriesBurnedForm(e.target.value)}
                                        placeholder={"minutes..."}
                                        name={"CaloriesBurned"}
                                    />
                                    </div>

                                    <div className={"col-md-2"}>
                                        <InputLabel className={"card-header text-white bg-danger"} style={{height:'50px',paddingTop:'5px'}}> Calories Intake </InputLabel>
                                    </div>

                                    <div className={"col-md-2"}>

                                    <TextField
                                        value={caloriesForm}
                                        onChange={(e)=>setCaloriesForm(e.target.value)}
                                        placeholder={"minutes..."}
                                        name={"CaloriesIntake"}
                                    />
                                    </div>


                                    <div className={"col-md-2"}>
                                        <center>

                                            <div onClick={(e)=>submitActivity(e)}>
                                                <img src={process.env.PUBLIC_URL + '/plus.png'}
                                                     style={{height: '40px', width: '40px', borderRadius: '80px'}} alt={"Add"}/>
                                            </div>
                                        </center>
                                    </div>

                                </div>

                                </form>


                            </div>

                           <form>

                           </form>
                        </div>

                    </div>

                    <div className={"col-md-1"}>

                    </div>
                    <div className={"col=md-4"}>





                        <div className={"card-header text-white bg-primary"}> Last Week </div>

                        <div
                            style={{
                                width: '400px',
                                height: '300px',
                                background: 'lightblue',
                                paddingTop:'20px'
                            }}
                        >

                            {dataCaloriesIntake && dataCaloriesIntake != "" && axesCaloriesIntake && axesCaloriesIntake != "" ?

                                <Chart key={refetchStatistics} data={dataCaloriesIntake} axes={axesCaloriesIntake} tooltip/>
                                : "No data"
                            }
                        </div>

                        <br/>
                        <br/>

                        <div className={"card-header text-white bg-danger"}>   <CSVLink data={csvData} style={{color:'white'}}>Export all data <BiDownload/> </CSVLink> </div>

                        <div>
                            <div style={{float:"right"}}>
                                <br/>
                                <br/>
                                <tr>
                                    <td style={{paddingTop:'100px important'}}> <InputLabel className={"card-header text-white bg-dark"} style={{height:'25px',paddingTop:'5px',paddingLeft:'5px',paddingRight:'5px'}}> Clear Data >>  </InputLabel></td>
                                    <td onClick={(e)=>{
                                        e.preventDefault()
                                        if (window.confirm("ALl the previous Data will be deleted ?")) {
                                                    deleteAllStats()
                                        }
                                    }}>  <img src={process.env.PUBLIC_URL + '/trash.png'}
                                               style={{height: '100px', width: '50px', borderRadius: '120px'}}/></td>
                                </tr>
                            </div>
                        </div>

                    </div>


                </div>




            </center>
        </>
    )
}