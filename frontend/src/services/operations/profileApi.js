import React from "react";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const {
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_STATISTICS_DATA_API

} = profileEndpoints;

export async function getUserEnrolledCourses(token){
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null,
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Printing Enorll Courses: ",response);
        //if response get fail
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        //save
        result = response?.data?.data;
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API ERROR--------", error);
        toast.error("Could Not Get Enrolled Courses");
    }
    toast.dismiss(toastId);

    return result;
}

//Get GET_INSTRUCTOR_STATISTICS_DATA
export const getInstructorStaticsticsData = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_STATISTICS_DATA_API, null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
    }
    catch(error){
        console.log("GET_INSTRUCTOR_STATISTICS_DATA_API ERROR--------", error);
        toast.error("Could Not Get Instuctor Dashboard Data");
    }
    toast.dismiss(toastId);
    return result;
}