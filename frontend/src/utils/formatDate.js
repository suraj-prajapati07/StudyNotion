import React from 'react'

export default function formatDate(dateString){
    
    //Date?
    const date = new Date(dateString);
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
    }
    const formattedDate = date.toLocaleDateString("en-US", options);
    //formatedDate look like -> June 17, 2025

    //Time?
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour <= 12 ? "AM" : "PM";

    const formattedTime = `${hour % 12}:${minute.toString().padStart(2, '0')} ${period}`;

    return `${formattedDate} | ${formattedTime}`;
}