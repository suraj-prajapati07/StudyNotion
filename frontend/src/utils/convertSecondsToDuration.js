import React from 'react'

export default function convertSecondsToDuration(totalSeconds){
    const hour = Math.floor(totalSeconds / 3600);
    const minute = Math.floor((totalSeconds % 3600) / 60);
    const second = Math.floor((totalSeconds % 3600) % 60);

    if(hour > 0){
        return `${hour}hr ${minute}min`;
    }
    else if(minute > 0){
        return `${minute}min ${second}sec`;
    }
    else{
        return `${second}sec`;
    }
}