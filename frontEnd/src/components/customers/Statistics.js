import React,{useState,useEffect,useMemo} from "react";
import axios from "axios";
import { Chart } from 'react-charts'

export default function Statistics(){

    const[weight , setWeight] = useState(true)

    const[data,setData] = useState();
   const [axes,setAxes] = useState();

    useEffect(()=>{

        axios.get('https://bloom-wellness-back.herokuapp.com/bodyinfo/getBodyInfo?email='+localStorage.getItem('email'),{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            // handle success
            console.log("bodyInfo",response.data);

                    let tempWeightData = []

                    for(let i=0;i<response.data.length;i++){
                       tempWeightData.push([response.data[i]['time'],response.data[i]['weight']])
                    }

                    console.log("tempWeightData",tempWeightData)
                     setData([
                            {
                                label: 'Weight',
                                data: tempWeightData
                            }
                        ])

                     setAxes(  [
                            { primary: true, type: 'linear', position: 'bottom' },
                            { type: 'linear', position: 'left' }
                        ])

                })

        .catch(function (error) {
            console.log(error);
        })


    },[])


    return(
        <>
            <center>
            <div
                style={{
                    width: '400px',
                    height: '300px',
                    background:'white',
                }}
            >

                {data && data != "" && axes && axes != "" ?
                    <Chart data={data} axes={axes}/>
                    : "No data"
                }
            </div>

            </center>
        </>
    )
}