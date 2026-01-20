import React from "react";
import {HiChatBubbleLeftRight} from "react-icons/hi2"
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5"

const contactDetails = [
    {
        icon: HiChatBubbleLeftRight,
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "sp407522@gmail.com",
    },
    {
        icon: BiWorld,
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:"Matwari Gandhimaidan, Hazaribagh, JH. 02",
    },
    {
        icon: IoCall,
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+91 9372994063",
    },

]

const ContactDetails = () => {
    return(
        <div className="w-full flex flex-col gap-6 bg-richblack-800 p-4 lg:p-6 rounded-xl">
            {
                contactDetails.map((ele, index) => {
                    let Icon = ele.icon;
                    return (
                        <div 
                            key={index}
                            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                        >
                            <div className="flex flex-row items-center gap-3">
                                <Icon size={25}/>
                                <h2 className="text-lg font-semibold text-richblack-5">
                                    {ele.heading}
                                </h2>
                            </div>
                            <p className="font-medium">
                                {ele.description}
                            </p>
                            <p className="font-semibold">
                                {ele.details}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ContactDetails;