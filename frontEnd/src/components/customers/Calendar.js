import React, {Component, useState} from 'react';
import {
    MonthlyBody,
    MonthlyCalendar,
    MonthlyNav,
    DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


import SimpleReactCalendar from 'simple-react-calendar'


export default function Cal() {
     const [value, onChange] = useState(new Date());


    return (
        <>
            <Calendar
                onChange={onChange}
                value={value}

            />
        </>


    )



}
