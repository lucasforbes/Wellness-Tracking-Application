import React,{useState,useEffect} from "react";

export default function ProfessionalDashboard(){

    const [activityList, setActivityList] = useState([{ ActivityName: "", ActivityDescription: "" , BodyPartsTargeted:"", Duration:""}]);

    const [workoutTitle,setWorkoutTitle]=useState("");
    const [workoutDescription,setWorkoutDescription]= useState("");
    const [paid,setPaid] = useState(false);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...activityList];
        list[index][name] = value;
        setActivityList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...activityList];
        list.splice(index, 1);
        setActivityList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setActivityList([...activityList, { ActivityName: "", ActivityDescription: "" , BodyPartsTargeted:"", Duration:""}]);
    };


    const [json,setJson] = useState("");

    const workoutSubmit=(e)=>{

        e.preventDefault()

        const json = JSON.stringify({
            'email': localStorage.getItem("email"),
            'activityList': activityList,
            'Title': workoutTitle,
            'Descriptiom': workoutDescription,
            'Paid': paid
        });

        setJson(json);

    }

    return (
        <div className="App">

            <form onSubmit={workoutSubmit}>

            Enter Workout Name: <input type={'text'} valu={workoutTitle}
                                       onChange={(e)=>setWorkoutTitle(e.target.value)}/>
                                       <br/>

            Enter Workout Description: <input type={'text'} valu={workoutDescription}
                                       onChange={(e)=>setWorkoutDescription(e.target.value)}/>

            <br/>

            Paid:  <select value={paid} onChange={(e)=>setPaid(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

            <br/>
            {activityList.map((activity, i) => {
                return (
                    <div className="box">
                        {/*<input*/}
                        {/*    name="firstName"*/}
                        {/*    placeholder="Enter First Name"*/}
                        {/*    value={x.firstName}*/}
                        {/*    onChange={e => handleInputChange(e, i)}*/}
                        {/*/>*/}
                        {/*<input*/}
                        {/*    className="ml10"*/}
                        {/*    name="lastName"*/}
                        {/*    placeholder="Enter Last Name"*/}
                        {/*    value={x.lastName}*/}
                        {/*    onChange={e => handleInputChange(e, i)}*/}
                        {/*/>*/}

                        <input
                        name={"ActivityName"}
                        placeholder={"Activity Name"}
                        value={activity.ActivityName}
                        onChange={e=>handleInputChange(e,i)}
                        />

                        <input
                            name={"ActivityDescription"}
                            placeholder={"Activity Description"}
                            value={activity.ActivityDescription}
                            onChange={e=>handleInputChange(e,i)}
                        />


                        <input
                            name={"BodyPartsTargeted"}
                            placeholder={"Body Parts Targeted: Legs "}
                            value={activity.BodyPartsTargeted}
                            onChange={e=>handleInputChange(e,i)}
                        />

                        <input
                            name={"Duration"}
                            placeholder={"Duration 10 minutes "}
                            value={activity.Duration}
                            onChange={e=>handleInputChange(e,i)}
                        />


                        <div className="btn-box">
                            {activityList.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {activityList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    </div>
                );
            })}
            <input type={"submit"} value={"Submit Workout"}/>

            <div style={{ marginTop: 20 }}>{JSON.stringify(json)}</div>


            </form>
        </div>
    );
}
